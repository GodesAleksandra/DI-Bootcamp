import httpx
import json
import asyncio
import config

class AgentOrchestrator:
    def __init__(self, client_manager):
        self.client_manager = client_manager

    def _redact_secrets(self, text: str) -> str:
        """Sanitizes text logs to ensure credentials are never exposed in UI buffers."""
        sanitized = text
        for secret_token in config.SENSITIVE_KEYS:
            if secret_token in sanitized:
                sanitized = sanitized.replace(secret_token, "[REDACTED_SECURITY_PARAMETER]")
        return sanitized

    async def _query_llm_with_retry(self, context: str, system_prompt: str) -> str:
        """Queries LLM using settings from config.py with exponential backoff and absolute timeout bounds."""
        backend = config.LLM_BACKEND.upper()
        
        if backend == "GROQ":
            url = "https://groq.com"
            headers = {
                "Authorization": f"Bearer {config.GROQ_API_KEY}",
                "Content-Type": "application/json"
            }
            payload = {
                "model": config.GROQ_MODEL,
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": context}
                ],
                "temperature": 0.2
            }
        else:
            # Local Ollama compliance setup
            url = f"{config.OLLAMA_HOST}/api/chat"
            headers = {"Content-Type": "application/json"}
            payload = {
                "model": config.OLLAMA_MODEL,
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": context}
                ],
                "stream": False,
                "options": {"temperature": 0.2, "num_keepalive": 0}
            }

        max_retries = 3
        backoff_delay = 2.0
        
        async with httpx.AsyncClient() as client:
            for attempt in range(max_retries):
                try:
                    response = await client.post(url, json=payload, headers=headers, timeout=180.0)
                    if response.status_code == 200:
                        data = response.json()
                        if backend == "GROQ":
                            return data['choices'][0]['message']['content']
                        else:
                            if "error" in data:
                                raise RuntimeError(f"Ollama API Error: {data['error']}")
                            return data['message']['content']
                    else:
                        raise RuntimeError(f"Http Bad Status Code: {response.status_code}")
                except Exception as e:
                    if attempt == max_retries - 1:
                        raise RuntimeError(f"LLM Connection completely failed after {max_retries} attempts.") from e
                    await asyncio.sleep(backoff_delay)
                    backoff_delay *= 2.0

    async def run_mission(self, user_input: str, log_callback) -> str:
        history = [{"role": "user", "content": f"User Goal: {user_input}"}]
        max_turns = 5
        
        for turn in range(1, max_turns + 1):
            tools_schema = self.client_manager.get_all_tools()
            
            real_tool_names = [t["name"] for t in tools_schema]

            system_prompt = (
                "You are an active agentic coordinator working inside an enterprise MCP application.\n"
                f"Available dynamic MCP tools:\n{json.dumps(tools_schema, indent=2)}\n\n"
                "You MUST respond in exactly ONE of the two formats below. Follow the structure strictly.\n\n"
                "=== FORMAT VARIANT 1: INVOKE TOOL ===\n"
                "If you need to use an MCP tool to fetch data or execute an action, output EXACTLY this:\n"
                "THOUGHT: <your reasoning here>\n"
                "ACTION:\n"
                "{\n"
                "  \"tool\": \"tool_name\",\n"
                "  \"arguments\": {}\n"
                "}\n\n"
                "=== FORMAT VARIANT 2: MISSION RESOLVED ===\n"
                "If you have fetched the data from GitHub, analyzed it, and are ready to finish, output EXACTLY this:\n"
                "THOUGHT: <your reasoning>\n"
                "FINAL_ANSWER:\n"
                "=== ARCHITECTURAL SUMMARY REPORT ===\n"
                "1. DETECTED BUG SUMMARY: (Write here what you found in the GitHub issue body)\n"
                "2. EXCEPTIONS & ROOT CAUSE: (Write the technical reason for the bug)\n"
                "3. PROPOSED ARCHITECTURAL FIX: (Write how it should be fixed or how it was resolved)\n"
                "CRITICAL: DO NOT write generic text like 'report has been generated'. You MUST extract real text from the tool responses and write a detailed multi-line analysis!"
            )

            
            log_callback(self._redact_secrets(f"🧠 **[Turn {turn}] Orchestrator analyzing execution plan...**"))
            
            context_feed = "\n".join([f"{m['role'].upper()}: {m['content']}" for m in history])
            
            try:
                llm_output = await self._query_llm_with_retry(context_feed, system_prompt)
            except Exception as llm_err:
                root_cause = llm_err.__cause__
                cause_text = f" | Inner Trace: {repr(root_cause)}" if root_cause else ""
                return f"Mission aborted due to critical LLM core failure: {llm_err}{cause_text}"
                
            history.append({"role": "assistant", "content": llm_output})
            
            if "FINAL_ANSWER:" in llm_output:
                if turn == 1:
                    history.append({
                        "role": "user", 
                        "content": "Error: You cannot finish the mission without calling 'get_issue' first to see the real data. Provide a valid ACTION block now."
                    })
                    continue
                clean_report = llm_output.split("FINAL_ANSWER:")[-1].strip()
                
                if "ACTION:" in clean_report:
                    clean_report = clean_report.split("ACTION:")[0].strip()
                
                return self._redact_secrets(clean_report)
                #return self._redact_secrets(llm_output.split("FINAL_ANSWER:")[-1].strip())
                
            if "ACTION:" in llm_output:
                try:
                    action_str = llm_output.split("ACTION:")[-1].strip()
                    
                    start_idx = action_str.find("{")
                    if start_idx == -1:
                        raise ValueError("No JSON object found after ACTION:")
                        
                    brace_count = 0
                    end_idx = -1
                    for i in range(start_idx, len(action_str)):
                        if action_str[i] == "{":
                            brace_count += 1
                        elif action_str[i] == "}":
                            brace_count -= 1
                            if brace_count == 0:
                                end_idx = i + 1
                                break
                                
                    if end_idx != -1:
                        action_str = action_str[start_idx:end_idx]
                    else:
                        action_str = action_str[start_idx:]
                    
                    action_json = json.loads(action_str)
                    raw_tool_name = action_json.get("tool", "")
                    tool_args = action_json.get("arguments", {})
                    
                    tool_aliases = {
                        "get_issue_details": "get_issue",
                        "fetch_issue_details": "get_issue",
                        "view_issue": "get_issue",
                        "get_bug_details": "get_issue"
                    }
                    target_tool = tool_aliases.get(raw_tool_name, raw_tool_name)
                    
                    log_callback(self._redact_secrets(f"🎬 **Executing tool call** `{target_tool}` (mapped from `{raw_tool_name}`) with inputs: {json.dumps(tool_args)}"))
                    
                    raw_result = await self.client_manager.invoke_tool(target_tool, tool_args)
                    
                    log_callback(self._redact_secrets(f"📥 **Response received**: {json.dumps(raw_result)[:200]}..."))
                    history.append({"role": "user", "content": f"Execution data return for [{target_tool}]: {json.dumps(raw_result)}"})
                    
                except Exception as execution_fault:
                    fault_details = getattr(execution_fault, "message", None)
                    if not fault_details and hasattr(execution_fault, "args"):
                        fault_details = str(execution_fault.args)
                    if not fault_details or fault_details == "()":
                        fault_details = f"{type(execution_fault).__name__}: {str(execution_fault)}"
                        
                    log_callback(f"⚠️ **Error step captured**: {fault_details}. Injecting corrective step...")
                    history.append({"role": "user", "content": f"Execution error triggered: {fault_details}. Adjust arguments or choose alternative path."})
            else:
                history.append({"role": "user", "content": "Error: You violated formatting boundaries. Respond strictly with ACTION or FINAL_ANSWER blocks."})

        return "Mission timed out: Agent hit loop bounds without converging on final resolution."
