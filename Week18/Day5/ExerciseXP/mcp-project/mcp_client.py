import asyncio
import json
import sys
import shlex
from typing import Dict, List, Any
import config

class RealMCPClient:
    """Manages the process lifecycle and real JSON-RPC multiplexing of an external MCP server."""
    def __init__(self, name: str, command: str):
        self.name = name
        self.command = command
        self.process: asyncio.subprocess.Process = None
        self.tools: List[Dict[str, Any]] = []
        self._request_id = 1
        self._pending_requests: Dict[int, asyncio.Future] = {}
        self._listen_task: asyncio.Task = None

    async def start(self):
        """Starts the server process using unified config boundaries."""
        self.process = await asyncio.create_subprocess_shell(
            self.command,
            stdin=asyncio.subprocess.PIPE,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
            
        self._listen_task = asyncio.create_task(self._listen_stdout())
        await self.discover_tools()


    async def _listen_stdout(self):
        try:
            buffer = ""
            while self.process.stdout and not self.process.stdout.at_eof():ws
                chunk = await self.process.stdout.read(100)
                if not chunk:
                    break
                
                buffer += chunk.decode(errors="ignore")
                
                while "{" in buffer and "}" in buffer:
                    start_idx = buffer.find("{")
                    brace_count = 0
                    end_idx = -1
                    
                    for i in range(start_idx, len(buffer)):
                        if buffer[i] == "{":
                            brace_count += 1
                        elif buffer[i] == "}":
                            brace_count -= 1
                            if brace_count == 0:
                                end_idx = i + 1
                                break
                    
                    if end_idx != -1:
                        json_str = buffer[start_idx:end_idx]
                        buffer = buffer[end_idx:]
                        
                        try:
                            response = json.loads(json_str.strip())
                            req_id = response.get("id")
                            if req_id in self._pending_requests:
                                future = self._pending_requests.pop(req_id)
                                if not future.done():
                                    future.set_result(response)
                        except Exception:
                            pass
                    else:
                        break
        except asyncio.CancelledError:
            pass

    async def _send_request(self, method: str, params: Dict[str, Any] = None) -> Dict[str, Any]:
        current_id = self._request_id
        self._request_id += 1
        
        payload = {
            "jsonrpc": "2.0",
            "id": current_id,
            "method": method,
            "params": params or {}
        }
        
        future = asyncio.get_running_loop().create_future()
        self._pending_requests[current_id] = future
        
        self.process.stdin.write((json.dumps(payload) + "\n").encode())
        await self.process.stdin.drain()
        
        return await asyncio.wait_for(future, timeout=120.0)

    async def discover_tools(self):
        try:
            res = await self._send_request("tools/list")
            self.tools = res.get("result", {}).get("tools", [])
        except Exception:
            self.tools = []

    async def call_tool(self, tool_name: str, arguments: Dict[str, Any]) -> Any:
        res = await self._send_request("tools/call", {"name": tool_name, "arguments": arguments})
        if "error" in res:
            raise RuntimeError(res["error"].get("message", "Unknown protocol execution failure"))
        return res.get("result", {}).get("content", [])

    async def stop(self):
        if self._listen_task:
            self._listen_task.cancel()
        if self.process:
            try:
                self.process.terminate()
                await self.process.wait()
            except Exception:
                pass

class MCPClientManager:
    """Coordinates multiple running MCP servers and exposes a unified tools workspace."""
    def __init__(self):
        self.clients: Dict[str, RealMCPClient] = {}

    async def register_and_start(self, name: str, command: str):
        if name in self.clients:
            await self.clients[name].stop()
        client = RealMCPClient(name, command)
        await client.start()
        self.clients[name] = client

    def get_all_tools(self) -> List[Dict[str, Any]]:
        combined = []
        for client_name, client in self.clients.items():
            for t in client.tools:
                tool_copy = t.copy()
                tool_copy["_server_owner"] = client_name
                combined.append(tool_copy)
        return combined

    async def invoke_tool(self, tool_name: str, arguments: Dict[str, Any]) -> Any:
        for client in self.clients.values():
            if any(t["name"] == tool_name for t in client.tools):
                return await client.call_tool(tool_name, arguments)
        raise ValueError(f"Target tool '{tool_name}' is not registered in active workspaces.")

    async def shutdown(self):
        await asyncio.gather(*[c.stop() for c in self.clients.values()], return_exceptions=True)
        self.clients.clear()
