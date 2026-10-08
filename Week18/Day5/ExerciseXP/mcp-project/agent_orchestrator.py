import httpx
import json
import asyncio
import config
import difflib
from groq import AsyncGroq
from custom_insight_server import write_report_to_disk
import datetime

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


    async def _query_llm_with_retry(self, context: str, system_prompt: str, log_callback) -> str:
        """Queries LLM using settings from config.py with exponential backoff and absolute timeout bounds."""
        backend = config.LLM_BACKEND.upper()
        
        if backend == "GROQ":
            client = AsyncGroq(api_key=config.GROQ_API_KEY)

            try:
                safe_context = context
                if len(context) > 5000:
                    log_callback("✂️ *Context window is full. Compressing history payload to fit Groq Free Tier...*")
                    safe_context = context[:2000] + "\n\n... [Truncated for Context Window Stability] ...\n\n" + context[-2500:]
                
                completion = await client.chat.completions.create(
                    model=config.GROQ_MODEL,
                    messages=[
                        {"role": "system", "content": system_prompt.strip()},
                        {"role": "user", "content": safe_context.strip()}
                    ],
                    temperature=0.1,
                    max_tokens=512,
                    tool_choice="none"
                )
                return completion.choices[0].message.content
                    
            except Exception as e:
                raise RuntimeError(f"Official Groq SDK invocation failed: {str(e)}")
            
        else:
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
                        if "error" in data:
                            raise ValueError(f"Ollama Internal Error: {data['error']}")
                        return data['message']['content']
                    
                    elif response.status_code in (400, 401, 403, 404):
                        raise ValueError(f"Permanent API Error ({response.status_code}): {response.text}")
                    else:
                        raise httpx.HTTPStatusError(
                            f"Transient HTTP Error: {response.status_code}", 
                            request=response.request, 
                            response=response
                        )
                
                except (ValueError, KeyError) as perm_err:
                    raise RuntimeError(f"Unrecoverable LLM failure: {perm_err}") from perm_err
                    
                except (httpx.HTTPStatusError, httpx.RequestError) as trans_err:
                    if attempt == max_retries - 1:
                        raise RuntimeError(f"LLM Connection completely failed after {max_retries} attempts.") from trans_err
                    
                    await asyncio.sleep(backoff_delay)
                    backoff_delay *= 2.0
                
    async def run_mission(self, user_input: str, log_callback) -> str:
        safe_input = user_input[:4000] + "... [Truncated to prevent Groq HTTP 413]" if len(user_input) > 4000 else user_input
        history = [{"role": "user", "content": f"User Goal: {safe_input}"}]
        max_turns = getattr(config, "AGENT_MAX_TURNS", 5)
        
        #for turn in range(1, max_turns + 1):
        turn = 1
        while turn <= max_turns:
            if turn > 1:
                log_callback("⏳ *Cooling down API rate limits before next turn...*")
                await asyncio.sleep(2.5)
            tools_schema = self.client_manager.get_all_tools()
            real_tool_names = [t["name"] for t in tools_schema]

            optimized_tools_list = []
            for t in tools_schema:
                optimized_tools_list.append({
                    "name": t.get("name"),
                    "description": t.get("description", "")[:150],
                    "input_keys": list(t.get("inputSchema", {}).get("properties", {}).keys()) 
                })

            system_prompt = (
                "You are an active agentic coordinator working inside an enterprise MCP application.\n"
                "Your goal is to fully satisfy the User Goal by planning strategic actions and dynamically calling tools.\n\n"
                f"Available dynamic MCP tools:\n{json.dumps(optimized_tools_list, indent=2)}\n\n"
                "CRITICAL BOUNDARY RULE: You can ONLY call tools from the 'Available dynamic MCP tools' list above. "
                "If a tool you want to use is not in that list, it DOES NOT EXIST. In that case, you MUST use alternative methods "
                "or dynamic generic tools (like web search or text analyzers if available) to fulfill the mission. "
                "DO NOT invent tool names.\n\n"
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

			
            log_callback(self._redact_secrets(f"🧠 **[Turn {turn}/{max_turns}] Orchestrator analyzing execution plan...**"))
            
            context_feed = "\n".join([f"{m['role'].upper()}: {m['content']}" for m in history])
            
            try:
                llm_output = await self._query_llm_with_retry(context_feed, system_prompt, log_callback)
                if not llm_output or not llm_output.strip():
                    log_callback(f"⚠️ Warning: LLM returned empty output on Turn {turn}. Retrying with strict directive...")
                    history.append({
                        "role": "user",
                        "content": "Error: You provided an empty response. You must output either an ACTION block or the FINAL_ANSWER report right now."
                    })
                    continue
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
                lower_output = llm_output.lower()
                if "failed to generate" in lower_output or "failed to respond" in lower_output:
                    log_callback("🛑 **Guard Alert: LLM is complaining about tool failure instead of retrying. Forcing retry...**")
                    history.append({
                        "role": "user",
                        "content": (
                            "Error: You claim the tool failed, but you must look at the actual Tool Execution Result in the context. "
                            "If the previous tool output was missing or invalid, re-execute the correct tool with proper arguments now. "
                            "DO NOT submit a final answer with missing evidence."
                        )
                    })
                    continue
                parts = llm_output.split("FINAL_ANSWER:")
                clean_report = parts[-1].strip()
                if "ACTION:" in clean_report:
                    clean_report = clean_report.split("ACTION:")[0].strip()

                try:
                    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
                    filename = f"mission_report_{timestamp}.md"
                    
                    log_callback(f"💾 *Orchestrator pipeline forcing automated report preservation to disk...*")
                    save_status = write_report_to_disk(filename, clean_report)
                    log_callback(f"📝 *Filesystem status: {save_status}*")
                except Exception as save_err:
                    log_callback(f"⚠️ *Automated internal pipeline saving failed: {str(save_err)}*")

                
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
                                
                    if end_idx == -1:
                        raise ValueError("Incomplete or malformed JSON block under ACTION.")
						 
                    action_json = json.loads(action_str[start_idx:end_idx])
                    tool_name = action_json.get("tool")
                    tool_args = action_json.get("arguments", {})

                    matched_tool = next((t for t in tools_schema if t["name"] == tool_name), None)

                    if not matched_tool:
                        close_matches = difflib.get_close_matches(tool_name, real_tool_names, n=1, cutoff=0.4)
                        suggestion = f" Did you mean '{close_matches[0]}'?" if close_matches else ""

                        log_callback(f"⚠️ Validation failed: Tool '{tool_name}' is not available in tools_schema.{suggestion}")
                        
                        history.append({
                            "role": "user",
                            "content": (
                                f"Error: Tool '{tool_name}' is not registered in the system.{suggestion} "
                                f"Available tools are: {real_tool_names}. "
                                f"Adjust your plan: use correct names or proceed using alternative methods."
																							
                            )
                        })
                        continue

                    input_schema = matched_tool.get("inputSchema")
                    if input_schema:
                        from jsonschema import validate, ValidationError
                        
                        if isinstance(tool_args, dict):
                            required_fields = input_schema.get("required", [])
                            
                            if "issue_number" in required_fields and "issue_number" not in tool_args:
                                for alias in ["pull_number", "issue", "number", "id"]:
                                    if alias in tool_args:
                                        tool_args["issue_number"] = tool_args.pop(alias)
                                        break
                                        
                            if "issue_number" in tool_args and isinstance(tool_args["issue_number"], str):
                                if tool_args["issue_number"].isdigit():
                                    tool_args["issue_number"] = int(tool_args["issue_number"])

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
                    if isinstance(tool_args, dict):
                        tool_args = {
                            k: v for k, v in tool_args.items() 
                            if v is not None and v != "" and v != [] and v != {}
                        }

                    log_callback(f"🎬 Executing tool call {tool_name} with inputs: {json.dumps(tool_args)}")
                    
                    try:
                        tool_result = await self.client_manager.invoke_tool(tool_name, tool_args)
                    except Exception as server_err:
                        error_msg = str(server_err)
                        log_callback(f"⚠️ Tool execution failed on MCP server: {error_msg}")
                        
                        history.append({
                            "role": "user",
                            "content": (
                                f"Error: The tool '{tool_name}' returned a protocol validation error: {error_msg}. "
                                f"This usually happens when optional fields (like 'proxy' or 'headers') are passed with empty/invalid values. "
                                f"Please try calling '{tool_name}' again, but COMPLETELY OMIT any empty optional parameters from your 'arguments' object."
                            )
                        })
                        continue

                    cleaned_result = tool_result
                    
                    if tool_name == "fetch_html" and isinstance(tool_result, str):
                        try:
                            from bs4 import BeautifulSoup
                            soup = BeautifulSoup(tool_result, "html.parser")
							
                            for element in soup(["script", "style", "nav", "footer", "header", "svg"]):
                                element.extract()
								
                            cleaned_result = soup.get_text(separator="\n", strip=True)

                            if len(tool_result) > 5000:
                                cleaned_result = cleaned_result[:5000] + "\n...[Truncated for Groq payload stability]..."
                            else:
                                cleaned_result = cleaned_result
							
                        except ImportError:
                            cleaned_result = tool_result[:4000] + "\n...[Raw HTML truncated]..."
                            
                    elif tool_name == "fetch_txt" and isinstance(tool_result, str):
                        if len(tool_result) > 8000:
                            cleaned_result = tool_result[:8000] + "\n...[Text truncated for context window stability]..."
                            
                    elif tool_name == "fetch_readable" and isinstance(tool_result, str):
                        if len(tool_result) > 5000:
                            cleaned_result = tool_result[:5000] + "\n...[Truncated for Groq payload stability]..."

                    history.append({
                        "role": "user",
                        "content": f"Tool Execution Result for '{tool_name}':\n{cleaned_result}"
                    })


                except Exception as parse_err:
                    log_callback(f"⚠️ Failed to process action block: {parse_err}")
                    history.append({
                        "role": "user",
                        "content": f"Error: Failed to process your ACTION block. Details: {str(parse_err)}. Please verify tool names and structure."
                    })
                    turn += 1
                    continue
            else:
                error_msg = "Error: Your response did not contain a valid ACTION block or a FINAL_ANSWER report. Please follow the instructions."
                log_callback(f"⚠️ Invalid response format from LLM. Requesting retry...")
                history.append({
                    "role": "user",
                    "content": error_msg
                })
                turn += 1
                continue
                
            turn += 1
        log_callback(f"🛑 Mission failure: Maximum execution depth of {max_turns} turns reached without final resolution.")
        fallback_report = (
        "=== ARCHITECTURAL SUMMARY REPORT ===\n"
        "1. EXECUTIVE SUMMARY: Mission Failed. The agentic orchestrator exceeded the allocated operational turn budget before synthesizing a definitive answer.\n"
        f"2. DATA LOGS & EVIDENCE: Trapped at execution depth (Turn {max_turns}/{max_turns}). Last registered agent state involved iterative tool calls or unresolvable schema loops.\n"
        "3. RESOLUTION & NEXT STEPS: Aborted due to step-budget exhaustion. Please refine your instruction prompt, expand AGENT_MAX_TURNS inside config.py, or verify if the underlying small-scale LLM is stuck in logical loops."
        )
        return self._redact_secrets(fallback_report)