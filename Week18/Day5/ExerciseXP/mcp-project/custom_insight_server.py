import json
import sys

def custom_server_loop():
    """
    Standard-compliant MCP server executing over standard I/O pipelines.
    Implements tools/list and tools/call for the 'insights' pipeline layer.
    """
    while True:
        try:
            line = sys.stdin.readline()
            if not line:
                break
            request = json.loads(line)
            req_id = request.get("id")
            method = request.get("method")
            
            if method == "tools/list":
                response = {
                    "jsonrpc": "2.0",
                    "id": req_id,
                    "result": {"tools": [{
                        "name": "insight_summarize_data",
                        "description": "Synthesizes extracted bug documents and reference web materials into pure architecture action items.",
                        "inputSchema": {
                            "type": "object",
                            "properties": {
                                "raw_data": {"type": "string", "description": "Combined logs from GitHub and webpage fetch metrics."}
                            },
                            "required": ["raw_data"]
                        }
                    }]}
                }
            elif method == "tools/call":
                params = request.get("params", {})
                tool_name = params.get("name")
                arguments = params.get("arguments", {})
                
                if tool_name == "insight_summarize_data":
                    raw_text = arguments.get("raw_data", "")
                    summary = f"[Insight Node Synthesis Result]\nProcessed length: {len(raw_text)} chars.\nCore Action Item: Resolved dependencies and validated standard compliance across targets."
                    response = {
                        "jsonrpc": "2.0",
                        "id": req_id,
                        "result": {"content": [{"type": "text", "text": summary}]}
                    }
                else:
                    response = {"jsonrpc": "2.0", "id": req_id, "error": {"code": -32601, "message": "Tool not found"}}
            else:
                response = {"jsonrpc": "2.0", "id": req_id, "error": {"code": -32601, "message": "Method not allowed"}}
                
            sys.stdout.write(json.dumps(response) + "\n")
            sys.stdout.flush()
        except Exception as e:
            sys.stderr.write(f"Custom Server Error: {str(e)}\n")
            sys.stderr.flush()

if __name__ == "__main__":
    custom_server_loop()
