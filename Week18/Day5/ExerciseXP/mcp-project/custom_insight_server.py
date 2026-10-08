import sys
import json
import asyncio
import httpx
import config
import os

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
            "temperature": 0.3
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
            "options": {"temperature": 0.3}
        }

    try:
        print(f"[InsightServer Info] Dispatched LLM analysis request to Host: {url}. Backend: {backend}...", file=sys.stderr)
        sys.stderr.flush()
        async with httpx.AsyncClient(trust_env=True) as client:
            response = await client.post(url, json=payload, headers=headers, timeout=20.0)
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

def write_report_to_disk(filename: str, content: str) -> str:
    """
    Safely writes generated text reports to a designated 'reports' directory.
    Prevents directory traversal attacks by enforcing strict path resolution.
    """
    try:
        base_dir = os.path.abspath("./mcp_reports")
        os.makedirs(base_dir, exist_ok=True)
        
        safe_filename = os.path.basename(filename)
        if not safe_filename:
            return "[Error] Invalid or empty filename provided."
            
        target_path = os.path.join(base_dir, safe_filename)
        
        with open(target_path, "w", encoding="utf-8") as f:
            f.write(content)
            
        return f"[Success] Report successfully written to secure local path: {target_path}"
    except Exception as e:
        return f"[Error] Filesystem write operation failed: {str(e)}"


async def handle_mcp_request(request_json: dict) -> dict:
    """Processes incoming JSON-RPC requests conforming to the Model Context Protocol."""
    req_id = request_json.get("id")
    method = request_json.get("method")
    params = request_json.get("params", {})

    mcp_output_schema = {
        "type": "object",
        "properties": {
            "content": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "type": {"type": "string"},
                        "text": {"type": "string"}
                    },
                    "required": ["type", "text"]
                }
            }
        },
        "required": ["content"]
    }

    if method == "tools/list":
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "result": {
                "tools": [
                    {
                        "name": "insight_summarize_data",
                        "description": "Analyzes raw text payload or dynamic tool outputs and generates an advanced executive summary via LLM synthesis.",
                        "inputSchema": {
                            "type": "object",
                            "properties": {
                                "data": {
                                    "type": "string",
                                    "description": "The raw data logs, code, or context text string that needs comprehensive synthesis."
                                },
                                "analysis_type": {
                                    "type": "string",
                                    "description": "Optional focus area for the report (e.g., 'technical', 'financial', 'security', 'general').",
                                    "default": "general"
                                }
                            },
                            "required": ["data"]
                        },
                        "outputSchema": mcp_output_schema
                    },
                    {
                        "name": "insight_save_report",
                        "description": "Persists any text-based synthesis, analysis, or data report to the local file system inside a secure reports catalog.",
                        "inputSchema": {
                            "type": "object",
                            "properties": {
                                "filename": {
                                    "type": "string",
                                    "description": "The target name of the file (e.g., 'system_audit_report.txt' or 'incident_metrics.md')."
                                },
                                "content": {
                                    "type": "string",
                                    "description": "The full text/markdown content payload to be saved on disk."
                                }
                            },
                            "required": ["filename", "content"]
                        },
                        "outputSchema": mcp_output_schema
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

            generated_analysis = await query_llm_for_analysis(raw_data, analysis_type)
            
            detailed_report = (
                "=== CUSTOM INSIGHT REAL-TIME REPORT ===\n"
                f"Metrics Profiler: Character Length Generated -> {len(raw_data)}\n"
                f"Analysis Dimension: Strategy -> {analysis_type.upper()}\n"
                "---------------------------------------\n"
                f"{generated_analysis}"
            )

            return {
                "jsonrpc": "2.0",
                "id": req_id,
                "result": {
                    "content": [{"type": "text", "text": detailed_report}]
                }
            }

        elif tool_name == "insight_save_report":
            filename = arguments.get("filename", "")
            content = arguments.get("content", "")
            
            if not filename or not content:
                return {
                    "jsonrpc": "2.0",
                    "id": req_id,
                    "result": {"content": [{"type": "text", "text": "[Error] Missing filename or content parameters."}]}
                }
            
            save_status = write_report_to_disk(filename, content)
            
            return {
                "jsonrpc": "2.0",
                "id": req_id,
                "result": {
                    "content": [{"type": "text", "text": save_status}]
                }
            }
        else:
            return {
                "jsonrpc": "2.0",
                "id": req_id,
                "error": {"code": -32601, "message": f"Method not found: Tool '{tool_name}' doesn't exist."}
            }


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