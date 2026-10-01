import httpx
import os
import json
import asyncio

class AgentOrchestrator:
    def __init__(self, client_manager):
        """
        Initializes the agentic orchestrator targeting the local Ollama instance.
        """
        self.client_manager = client_manager
        self.api_url = "http://localhost:11434/api/chat"
        self.model_name = "llama3"

    def _query_llm(self, context: str, system_prompt: str) -> str:
        """
        Queries the local Ollama runtime using standard chat parameters with infinite timeout.
        """
        payload = {
            "model": self.model_name,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": context}
            ],
            "stream": False,
            "options": {
                "temperature": 0.1,  # Low temperature for strict structured format adherence
                "num_ctx": 4096
            }
        }
        
        try:
            response = httpx.post(self.api_url, json=payload, timeout=None)
            if response.status_code != 200:
                raise RuntimeError(f"Ollama API Error [{response.status_code}]: {response.text}")
            data = response.json()
            return data['message']['content']
        except httpx.RequestError as transport_error:
            raise RuntimeError(f"Failed to communicate with local Ollama instance: {transport_error}")

    async def run_mission(self, user_input: str, log_callback) -> str:
        """
        Autonomous execution loop. The LLM can choose to call a tool or provide a final answer.
        The loop runs iteratively up to a maximum of 5 steps.
        """
        log_callback("⚙️ **Initializing dynamic workspace discovery...**")
        
        # 1. Fetch live tool schemas from the client manager
        available_tools = []
        try:
            if hasattr(self.client_manager, "get_all_tools"):
                available_tools = self.client_manager.get_all_tools()
            elif hasattr(self.client_manager, "get_tools"):
                available_tools = self.client_manager.get_tools()
        except Exception as e:
            log_callback(f"⚠️ [Warning] Tools discovery lookup failed: {e}")

        # 2. Setup the strict execution guidelines for the LLM agent
        system_prompt = (
            "You are an expert autonomous agentic orchestrator operating over a Model Context Protocol (MCP) workspace.\n"
            "Your goal is to fulfill the user's request by utilizing the available tools step-by-step.\n\n"
            f"Available Tools Schema:\n{json.dumps(available_tools, indent=2)}\n\n"
            "CRITICAL RESPONSE FORMAT REGULATION:\n"
            "You must structure your thinking using exactly one of these two blocks on every step:\n\n"
            "Option A (If you need to execute a tool):\n"
            "THOUGHT: <your reasoning for this step>\n"
            "ACTION: {\"server\": \"ServerName\", \"tool\": \"tool_name\", \"arguments\": { ... }}\n\n"
            "Option B (If you have gathered all answers and are ready to finish):\n"
            "THOUGHT: <your final reasoning>\n"
            "FINAL_ANSWER: <your comprehensive summary response to the user>\n\n"
            "Do not output code blocks like ```json outside of the format fields. Stick to the text keys."
        )

        history = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"User Strategic Goal: {user_input}"}
        ]

        max_iterations = 5
        current_step = 1

        while current_step <= max_iterations:
            log_callback(f"🧠 **Step {current_step}: Planning and evaluating current state...**")
            
            # Compile immediate execution state context
            combined_context = "\n".join([f"{m['role'].upper()}: {m['content']}" for m in history if m['role'] != 'system'])
            
            # Request next autonomous decision from the LLM
            llm_output = self._query_llm(combined_context, system_prompt)
            
            # Append decision to the conversational thread log
            history.append({"role": "assistant", "content": llm_output})

            # Check if the agent decided to present the final resolution
            if "FINAL_ANSWER:" in llm_output:
                final_text = llm_output.split("FINAL_ANSWER:")[-1].strip()
                log_callback("🎯 **Agent arrived at final resolution successfully.**")
                return final_text

            # Parse structural action commands
            if "ACTION:" in llm_output:
                try:
                    action_part = llm_output.split("ACTION:")[-1].strip()
                    action_json = json.loads(action_part)
                    
                    server = action_json.get("server")
                    tool_name = action_json.get("tool")
                    args = action_json.get("arguments", {})
                    
                    log_callback(f"🎬 **Executing Tool:** `{tool_name}` on server `{server}` with parameters: `{json.dumps(args)}`")
                    
                    # 🚀 Dynamic invoke mapping against the active manager lifecycle
                    tool_result = "Tool execution skipped: client manager execution method not standard."
                    
                    # Try common naming variants for the execution method inside MCPClientManager
                    for method_name in ["call_tool", "execute_tool", "run_tool"]:
                        if hasattr(self.client_manager, method_name):
                            method = getattr(self.client_manager, method_name)
                            
                            # 🚀 FIX: Pass only tool_name and args, omitting the server name to match your 3-arg signature
                            if asyncio.iscoroutinefunction(method):
                                tool_result = await method(tool_name, args)
                            else:
                                tool_result = method(tool_name, args)
                            break
                    
                    log_callback(f"📥 **Tool Output Received:** {str(tool_result)[:300]}...")
                    
                    # Feed the real execution trace back into the model's short term memory
                    history.append({
                        "role": "user", 
                        "content": f"Tool execution result for [{tool_name}]: {json.dumps(tool_result)}"
                    })
                    
                except Exception as parse_err:
                    log_callback(f"⚠️ [Error Handling] Failed to parse or run action block: {parse_err}")
                    history.append({
                        "role": "user", 
                        "content": f"Error parsing your last action. Ensure valid JSON under ACTION key. Details: {parse_err}"
                    })
            else:
                # Fallback step if the local model responded loosely without explicit headers
                log_callback("⚠️ [Heuristic Adaptive Fallback] Loose response structure detected. Retrying context sync...")
                history.append({
                    "role": "user", 
                    "content": "Please match the required response format strictly. Use ACTION or FINAL_ANSWER blocks."
                })

            current_step += 1

        return "Agent execution terminated: Maximum iteration steps limit reached without resolving the goal."
