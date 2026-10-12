import sys
import json
import asyncio
import httpx
import config
import os
import psycopg2

async def query_llm_for_analysis(target_data: str, analysis_type: str = "general") -> str:
    """
    Queries the configured LLM backend (Groq or Ollama) using settings 
    from config.py to synthesize a deep analytical summary.
    """
    backend = getattr(config, "LLM_BACKEND", "GROQ").upper()
    
    system_prompt = (
        "You are an expert data analysis component inside a custom MCP insight server.\n"
        "Your task is to analyze the provided raw data deeply and return a comprehensive, professional summary report.\n"
        "Focus on key metrics, anomalies, actionable observations, and logical conclusions.\n"
        "Do not return generic statements. Be specific to the payload content."
    )
    
    user_content = f"Analysis Type Preference: {analysis_type}\n\nRaw Data Payload:\n{target_data}"

    if backend == "GROQ":
        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {config.GROQ_API_KEY}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": config.GROQ_MODEL,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_content}
            ],
            "temperature": 0.2
        }
    else:
        url = f"{getattr(config, 'OLLAMA_HOST', 'http://localhost:11434')}/api/chat"
        headers = {"Content-Type": "application/json"}
        payload = {
            "model": config.OLLAMA_MODEL,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_content}
            ],
            "stream": False,
            "options": {"temperature": 0.2}
        }

    try:
        async with httpx.AsyncClient(trust_env=True) as client:
            response = await client.post(url, json=payload, headers=headers, timeout=45.0)
            print(f"[InsightServer Info] HTTP response received. Status code: {response.status_code}", file=sys.stderr)
            sys.stderr.flush()
            if response.status_code == 200:
                res_data = response.json()
                if backend == "GROQ":
                    return res_data['choices'][0]['message']['content'].strip()
                else:
                    return res_data['message']['content'].strip()
            else:
                return f"[Error] LLM Backend returned bad status code: {response.status_code}"
    except Exception as e:
        print(f"[InsightServer Critical] HTTP request failed with exception: {str(e)}", file=sys.stderr)
        sys.stderr.flush()
        return f"[Error] Failed to connect to LLM for dynamic insight generation: {str(e)}"

def save_report_to_postgres(repo_source: str, issue_num: int, content: str) -> str:
    """Safely saves the final report to a PostgreSQL relational database."""
    try:
        conn = psycopg2.connect(
            host=getattr(config, "DB_HOST", "localhost"),
            database=getattr(config, "DB_NAME", "postgres"),
            user=getattr(config, "DB_USER", "postgres"),
            password=getattr(config, "DB_PASS", "password"),
            port=getattr(config, "DB_PORT", "5432")
        )
        cur = conn.cursor()
        
        cur.execute("""
            CREATE TABLE IF NOT EXISTS architectural_reports (
                id SERIAL PRIMARY KEY,
                source VARCHAR(255) NOT NULL,
                issue_number INT NOT NULL,
                generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                summary_report TEXT NOT NULL
            );
        """)
        
        cur.execute(
            "INSERT INTO architectural_reports (source, issue_number, summary_report) VALUES (%s, %s, %s) RETURNING id;",
            (repo_source, issue_num, content)
        )
        record_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        return f"[Success] Report saved to PostgreSQL with Record ID: {record_id}"
    except Exception as e:
        return f"[Error] Database persistent write operation failed: {str(e)}"

async def handle_mcp_request(request_json: dict) -> dict:
    """Processes incoming JSON-RPC requests conforming to the Model Context Protocol."""
    req_id = request_json.get("id")
    method = request_json.get("method")
    params = request_json.get("params", {})

    if method == "tools/list":
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "result": {
                "tools": [
                    {
                        "name": "insight_summarize_data",
                        "description": "Synthesizes raw text data or GitHub issue payloads into an executive report via LLM.",
                        "inputSchema": {
                            "type": "object",
                            "properties": {
                                "data": {
                                    "type": "string",
                                    "description": "Raw context string. This can be a GitHub issue body, log dump, or any unstructured text data for analysis."
                                },
                                "analysis_type": {
                                    "type": "string",
                                    "description": "Optional focus area for the report (e.g., 'technical', 'financial', 'security', 'general').",
                                    "default": "general"
                                }
                            },
                            "required": ["data"]
                        }
                    },
                    {
                        "name": "insight_save_to_db",
                        "description": "Persists the architectural text report to the production PostgreSQL database instance.",
                        "inputSchema": {
                            "type": "object",
                            "properties": {
                                "repo_source": {"type": "string", "description": "Format: 'owner/repo'"},
                                "issue_number": {"type": "integer"},
                                "content": {"type": "string", "description": "The Markdown/text report payload"}
                            },
                            "required": ["repo_source", "issue_number", "content"]
                        }
														 
                    },
                    {
                        "name": "insight_fetch_discussion",
                        "description": "Extracts the full text payload, categories, and replies from a GitHub Repository Discussion thread when traditional issue endpoints return 404.",
                        "inputSchema": {
                            "type": "object",
                            "properties": {
                                "repo_owner": {"type": "string", "description": "Owner of the repo (e.g., 'cli')."},
                                "repo_name": {"type": "string", "description": "Name of the repo (e.g., 'cli')."},
                                "discussion_number": {"type": "integer", "description": "The discussion ID number (e.g., 5315)."}
                            },
                            "required": ["repo_owner", "repo_name", "discussion_number"]
                        }
                    }
                ]
            }
        }

    elif method == "tools/call":
        tool_name = params.get("name")
        arguments = params.get("arguments", {})

        if tool_name == "insight_summarize_data":
            raw_data = arguments.get("data", "")
            analysis_type = arguments.get("analysis_type", "general")

            if not raw_data.strip():
                return {
                    "jsonrpc": "2.0",
                    "id": req_id,
                    "result": {
                        "content": [{"type": "text", "text": "Empty data payload provided. Summary aborted."}]
                    }
                }

            report = await query_llm_for_analysis(raw_data, analysis_type)

            return {
                "jsonrpc": "2.0",
                "id": req_id,
                "result": {
                    "content": [{"type": "text", "text": report}]
                }
            }

        elif tool_name == "insight_save_to_db":
            status = save_report_to_postgres(arguments.get("repo_source"), arguments.get("issue_number"), arguments.get("content"))
            return {"jsonrpc": "2.0", "id": req_id, "result": {"content": [{"type": "text", "text": status}]}}
        elif tool_name == "insight_fetch_discussion":
            owner = arguments.get("repo_owner")
            repo = arguments.get("repo_name")
            num = arguments.get("discussion_number")
            
            token = os.environ.get("GITHUB_TOKEN", "")
            headers = {"Authorization": f"Bearer {token}"} if token else {}
            
            query = """
            query($owner: String!, $repo: String!, $num: Int!) {
            repository(owner: $owner, name: $repo) {
                discussion(number: $num) {
                title
                body
                category { name }
                comments(first: 10) {
                    nodes { body }
                }
                }
            }
            }
            """
            
            async with httpx.AsyncClient() as client:
                res = await client.post(
                    "https://github.com",
                    json={"query": query, "variables": {"owner": owner, "repo": repo, "num": num}},
                    headers=headers
                )
                if res.status_code == 200:
                    disc_data = res.json().get("data", {}).get("repository", {}).get("discussion", {})
                    if not disc_data:
                        return {"jsonrpc": "2.0", "id": req_id, "result": {"content": [{"type": "text", "text": "Discussion thread not found."}]}}
                    
                    flat_text = f"Title: {disc_data.get('title')}\nCategory: {disc_data.get('category', {}).get('name')}\nBody: {disc_data.get('body')}"
                    return {"jsonrpc": "2.0", "id": req_id, "result": {"content": [{"type": "text", "text": flat_text}]}}
                return {"jsonrpc": "2.0", "id": req_id, "result": {"content": [{"type": "text", "text": f"GraphQL API Error: {res.status_code}"}]}}
                    
    return {
        "jsonrpc": "2.0",
        "id": req_id,
        "error": {"code": -32601, "message": f"Method not found: '{method}'"}
    }

def blocking_readline():
    """Synchronous read line from stdin, fully stable on Windows environments."""
    return sys.stdin.readline()


async def main():
    """Reads line-by-line stdin streams using executor to prevent Windows pipe blockages."""
    loop = asyncio.get_running_loop()
								   
    if hasattr(sys.stdin, 'reconfigure'):
        sys.stdin.reconfigure(encoding='utf-8')
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')

    try:
        while True:
            line_str = await loop.run_in_executor(None, blocking_readline)
            
            if not line_str:
                break
                
            line_str = line_str.strip()
            if not line_str:
                continue

            try:
                request_json = json.loads(line_str)
                response_json = await handle_mcp_request(request_json)
                
                sys.stdout.write(json.dumps(response_json) + "\n")
                sys.stdout.flush()
									
            except Exception as e:
                err_resp = {
                    "jsonrpc": "2.0",
                    "id": None,
                    "error": {"code": -32700, "message": f"Parse error during execution: {str(e)}"}
                }
                sys.stdout.write(json.dumps(err_resp) + "\n")
                sys.stdout.flush()
    except asyncio.CancelledError:
        pass

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        pass