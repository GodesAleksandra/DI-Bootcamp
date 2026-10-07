import httpx
import json
import asyncio
import config

class AgentOrchestrator:
    def __init__(self, client_manager):
        self.client_manager = client_manager

    def _redact_secrets(self, text_payload: str) -> str:
        """
        Redacts sensitive credential values from the given text payload using 
        an explicit, robust allowlist populated directly from configuration values.
        """
        if not text_payload or not isinstance(text_payload, str):
            return text_payload

        SECRET_ATTRIBUTES = [
            "GITHUB_TOKEN",
            "GROQ_API_KEY"
        ]

        redacted_payload = text_payload

        for attr in SECRET_ATTRIBUTES:										 
																							   
            secret_value = getattr(config, attr, None)											 
												
            if secret_value and isinstance(secret_value, str) and len(secret_value.strip()) > 3:
                secret_value = secret_value.strip()
										
                redacted_payload = redacted_payload.replace(secret_value, f"[REDACTED_{attr}]")

        return redacted_payload


    async def _query_llm_with_retry(self, context: str, system_prompt: str) -> str:
        """Queries LLM using settings from config.py with exponential backoff and absolute timeout bounds."""
        backend = config.LLM_BACKEND.upper()
        
        if backend == "GROQ":
            url = "https://api.groq.com/openai/v1/chat/completions"
            headers = {
                "Authorization": f"Bearer {config.GROQ_API_KEY}",
                "Content-Type": "application/json"
            }

            safe_system_prompt = system_prompt.strip()
            safe_context = context.strip()

            payload = {
                "model": config.GROQ_MODEL,
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": context}
                ],
                "temperature": 0.2,
                "max_tokens": 1024
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
                "Your goal is to fully satisfy the User Goal by planning strategic actions and dynamically calling tools.\n\n"
                f"Available dynamic MCP tools:\n{json.dumps(tools_schema, indent=2)}\n\n"
                "You MUST respond in exactly ONE of the two formats below. Follow the structure strictly.\n\n"
                "=== FORMAT VARIANT 1: INVOKE TOOL ===\n"
                "If you need to use an MCP tool to fetch data, explore state, or execute an action, output EXACTLY this:\n"
                "THOUGHT: <your technical reasoning here>\n"
                "ACTION:\n"
                "{\n"
                "  \"tool\": \"tool_name\",\n"
                "  \"arguments\": {}\n"
                "}\n\n"
                "=== FORMAT VARIANT 2: MISSION RESOLVED ===\n"
                "If you have successfully processed the required data, analyzed it, and are ready to finish, output EXACTLY this:\n"
                "THOUGHT: <your final analytical reasoning>\n"
                "FINAL_ANSWER:\n"
                "=== ARCHITECTURAL SUMMARY REPORT ===\n"
                "1. EXECUTIVE SUMMARY: (Provide a high-level summary of what was identified, processed, or accomplished)\n"
                "2. DATA LOGS & EVIDENCE: (Detail the technical metrics, responses, or data parameters retrieved from tools)\n"
                "3. RESOLUTION & NEXT STEPS: (State the final comprehensive answer, architectural resolution, or action plan)\n"
                "CRITICAL: DO NOT write generic placeholder text. You MUST extract real data from tool logs and generate a high-quality multi-line report!"
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
                if turn == 1 and real_tool_names:
                    history.append({
                        "role": "user", 
                        "content": "Error: You cannot resolve the mission immediately without executing any of the available live tools to verify current parameters. Provide a valid ACTION block."
                    })
                    continue
                
                parts = llm_output.split("FINAL_ANSWER:")
                clean_report = parts[-1].strip()
                if "ACTION:" in clean_report:
                    clean_report = clean_report.split("ACTION:")[0].strip()
                
                return self._redact_secrets(clean_report)
                
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
                    target_tool = action_json.get("tool", "")
                    tool_args = action_json.get("arguments", {})  

                    matched_tool = next((t for t in tools_schema if t["name"] == target_tool), None)
                    if not matched_tool:
                        raise ValueError(f"Tool '{target_tool}' is not available in tools_schema.")
                    
                    input_schema = matched_tool.get("inputSchema")
                    if input_schema:
                        from jsonschema import validate, ValidationError
                        try:
                            validate(instance=tool_args, schema=input_schema)
                        except ValidationError as schema_err:
                            if "issue_number" in tool_args and isinstance(tool_args["issue_number"], str):
                                if tool_args["issue_number"].isdigit():
                                    tool_args["issue_number"] = int(tool_args["issue_number"])
                                    validate(instance=tool_args, schema=input_schema)
                                else:
                                    raise schema_err
                            else:
                                raise schema_err
                    log_callback(self._redact_secrets(f"🎬 **Executing tool call** `{target_tool}` with inputs: {json.dumps(tool_args)}"))
                    #tool_result = await self.client_manager.invoke_tool(target_tool, tool_args)
                    try:
                        tool_result = await asyncio.wait_for(
                            self.client_manager.invoke_tool(target_tool, tool_args), 
                            timeout=15.0
                        )
                    except asyncio.TimeoutError:
                        raise RuntimeError(f"MCP tool '{target_tool}' timed out after 15 seconds.")
                    history.append({
                        "role": "user", 
                        "content": f"Tool Response: {json.dumps(tool_result)}"
                    })                    
                except Exception as parse_err:
                    log_callback(f"⚠️ **Validation/Execution failed:** {parse_err}")
                    history.append({
                        "role": "user",
                        "content": f"Failed to execute or parse your ACTION block. Error: {parse_err}. Ensure the tool name matches the schema exactly and arguments are valid JSON."
                    })
                    
        return "Mission incomplete: Maximum orchestrated execution turns exceeded without resolution."
																	
