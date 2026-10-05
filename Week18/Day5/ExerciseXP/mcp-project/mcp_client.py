import asyncio
import json
import sys
import shlex
from typing import Dict, List, Any
import config
import logging

logger = logging.getLogger("mcp_client")
if not logger.handlers:
    handler = logging.StreamHandler(sys.stdout)
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    logger.setLevel(logging.INFO)

class RealMCPClient:
    """Manages the process lifecycle and real JSON-RPC multiplexing of an external MCP server."""
    def __init__(self, name: str, command: Any):
        self.name = name
        self.command = command
        self.process: asyncio.subprocess.Process = None
        self.tools: List[Dict[str, Any]] = []
        self._request_id = 1
        self._pending_requests: Dict[int, asyncio.Future] = {}
        self._listen_task: asyncio.Task = None

    async def start(self):
        """Starts the server process using unified config boundaries safely without a shell wrapper."""
        if isinstance(self.command, list):
            cmd_args = self.command
        else:
            cmd_args = shlex.split(self.command, posix=False)
            cmd_args = [arg.strip('"').strip("'") for arg in cmd_args]

        if not cmd_args or not cmd_args[0]:
            raise ValueError(f"Invalid or empty command array provided for MCP server: '{self.command}'")

        logger.info(f"[{self.name}] Spawning MCP server process via exec: {cmd_args}")
        self.process = await asyncio.create_subprocess_exec(
            cmd_args[0],
            *cmd_args[1:],
            stdin=asyncio.subprocess.PIPE, 
            stdout=asyncio.subprocess.PIPE, 
            stderr=asyncio.subprocess.PIPE
        )
			
        self._listen_task = asyncio.create_task(self._listen_stdout())
        await self.discover_tools()

    async def _listen_stdout(self):
        """Listens to the server's stdout, extracts JSON objects, and resolves pending requests."""
        try:
            buffer = ""
            while self.process.stdout and not self.process.stdout.at_eof():
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
                            parsed_str = json_str.strip()
                            response = json.loads(parsed_str)
                            req_id = response.get("id")

                            if req_id in self._pending_requests:
                                future = self._pending_requests.pop(req_id)
                                if not future.done():
                                    future.set_result(response)
                            else:
                                logger.warning(
                                    f"[{self.name}] Received JSON-RPC message with unhandled or missing ID: {req_id}"
                                )
                        except json.JSONDecodeError as json_err:
                            logger.error(
                                f"[{self.name}] Critical JSON decoding failure. "
                                f"Raw string snippet: {repr(json_str[:200])}. Error: {json_err}"
                            )
                        except Exception as ex:
                            logger.error(
                                f"[{self.name}] Unexpected error while processing multiplexer frame. "
                                f"Raw frame: {repr(json_str[:200])}. Details: {ex}", 
                                exc_info=True
                            )
                    else:
                        break
        except asyncio.CancelledError:
            logger.info(f"[{self.name}] Stdout listening task cancelled normally.")
        except Exception as process_err:
            logger.critical(f"[{self.name}] Fatal error in listener loop: {process_err}", exc_info=True)


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
        
        logger.debug(f"[{self.name}] Sending request {current_id}: method='{method}'")
        self.process.stdin.write((json.dumps(payload) + "\n").encode())
        await self.process.stdin.drain()
        
        return await asyncio.wait_for(future, timeout=120.0)

    async def discover_tools(self):
        try:
            res = await self._send_request("tools/list")
            self.tools = res.get("result", {}).get("tools", [])
            logger.info(f"[{self.name}] Successfully discovered {len(self.tools)} tool(s).")
        except Exception as e:
            logger.error(f"[{self.name}] Failed to discover tools during initialization: {e}")
            self.tools = []

    async def call_tool(self, tool_name: str, arguments: Dict[str, Any]) -> Any:
        logger.info(f"[{self.name}] Dispatching tool invocation call: '{tool_name}'")
        res = await self._send_request("tools/call", {"name": tool_name, "arguments": arguments})
        if "error" in res:
            error_msg = res["error"].get("message", "Unknown protocol execution failure")
            logger.error(f"[{self.name}] Tool '{tool_name}' returned a protocol error: {error_msg}")
            raise RuntimeError(error_msg)
        return res.get("result", {}).get("content", [])

    async def stop(self):
        if self._listen_task:
            self._listen_task.cancel()
        if self.process:
            try:
                logger.info(f"[{self.name}] Terminating MCP server process...")
                self.process.terminate()
                await self.process.wait()
                logger.info(f"[{self.name}] Process stopped successfully.")
            except Exception as e:
                logger.error(f"[{self.name}] Error occurred while stopping process: {e}")


class MCPClientManager:
    """Coordinates multiple running MCP servers and exposes a unified tools workspace."""
    def __init__(self):
        self.clients: Dict[str, RealMCPClient] = {}

    async def register_and_start(self, name: str, command: str):
        if name in self.clients:
            logger.info(f"[Manager] Server '{name}' already exists. Re-registering...")
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
        logger.info("[Manager] Initiating global workspace shutdown sequence...")
        await asyncio.gather(*[c.stop() for c in self.clients.values()], return_exceptions=True)
        self.clients.clear()
        logger.info("[Manager] All active workspaces cleared.")