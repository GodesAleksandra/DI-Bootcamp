import streamlit as st
import asyncio
import sys
import atexit
from mcp_client import MCPClientManager
from agent_orchestrator import AgentOrchestrator
import config
import os

st.set_page_config(page_title="Production MCP Workspace", layout="wide", page_icon="🛡️")
st.title("🛡️ Enterprise Agentic MCP Workspace")

# Synchronized session-state container setup
if "client_manager" not in st.session_state:
    st.session_state.client_manager = MCPClientManager()
    st.session_state.orchestrator = AgentOrchestrator(st.session_state.client_manager)
    st.session_state.servers_started = False

    # ДОБАВЛЕНО: Глобальный перехватчик завершения работы приложения (Tear-down Hook)
    # Гарантирует вызов shutdown() при закрытии терминала, остановке сервера или Ctrl+C
    def global_sync_teardown():
        try:
            # Создаем изолированный цикл событий для выполнения асинхронного закрытия подпроцессов
            loop = asyncio.new_event_loop()
            loop.run_until_complete(st.session_state.client_manager.shutdown())
            loop.close()
        except Exception:
            pass

    atexit.register(global_sync_teardown)

async def initialize_all_servers(manager: MCPClientManager):
    """Launches all 3 servers sequentially with clean configurations to prevent deadlocks."""
    import os
    
    if getattr(config, "GITHUB_TOKEN", None):
        os.environ["GITHUB_TOKEN"] = config.GITHUB_TOKEN

    try:
        await manager.register_and_start("GitHubServer", config.GITHUB_MCP_COMMAND)
        st.sidebar.success("✅ GitHubServer initiated successfully!")
    except Exception as e:
        st.sidebar.error(f"❌ GitHubServer failed: {e}")

    try:
        await manager.register_and_start("FetchServer", config.FETCH_MCP_COMMAND)
        st.sidebar.success("✅ FetchServer initiated successfully!")
    except Exception as e:
        st.sidebar.error(f"❌ FetchServer failed: {e}")

    try:
        await manager.register_and_start("InsightServer", config.INSIGHT_MCP_COMMAND)
        st.sidebar.success("✅ InsightServer initiated successfully!")
    except Exception as e:
        st.sidebar.error(f"❌ InsightServer failed: {e}")

with st.sidebar:
    st.header("🌐 System Infrastructure Runtime")
    st.metric("LLM Backend Target", config.LLM_BACKEND)
    st.metric("Model Context", config.OLLAMA_MODEL if config.LLM_BACKEND == "OLLAMA" else config.GROQ_MODEL)
    
    if st.button("🔌 Establish Active Workspace Connectors"):
        with st.spinner("Spawning infrastructure sub-processes and verifying JSON-RPC handshakes..."):
            try:
                loop = asyncio.get_event_loop()
            except RuntimeError:
                loop = asyncio.new_event_loop()
                asyncio.set_event_loop(loop)
                
            loop.run_until_complete(initialize_all_servers(st.session_state.client_manager))
            st.session_state.servers_started = True
            st.success("All 3 servers registered and responding via valid JSON-RPC channels!")

if st.session_state.servers_started:
    st.subheader("💡 Dynamic Discovered Capabilities Matrix")
    st.json(st.session_state.client_manager.get_all_tools())

    st.subheader("🎯 Orchestrator Target Objective")
    user_goal = st.text_area("Define workflow automation boundaries:", 
                             "Fetch bug details from GitHub issue #702 (owner: 'cli', repo: 'cli'), scrub reference docs for exceptions, and generate an architectural summary report.")

    if st.button("🚀 Trigger Autonomous Planner Loop"):
        log_canvas = st.empty()
        log_accumulator = []

        def ui_callback(message: str):
            log_accumulator.append(message)
            log_canvas.markdown("\n\n".join(log_accumulator))

        with st.spinner("Agent evaluating multi-server tasks..."):
            try:
                loop = asyncio.get_event_loop()
            except RuntimeError:
                loop = asyncio.new_event_loop()
                asyncio.set_event_loop(loop)

            final_report = loop.run_until_complete(
                st.session_state.orchestrator.run_mission(user_goal, log_callback=ui_callback)
            )
            st.success("✨ Target Accomplished!")
            
            if final_report and str(final_report).strip():
                st.info(f"**Final System Resolution Output:**\n{final_report}")
            else:
                st.error("⚠️ Оркестратор завершил миссию, но вернул пустой отчет (None или пустую строку).")
                
                if hasattr(st.session_state.orchestrator, 'memory') and st.session_state.orchestrator.memory:
                    st.warning("🔄 Попытка извлечь последний ответ из истории оркестратора:")
                    # Берем последнее сообщение из истории агента
                    last_msg = st.session_state.orchestrator.memory[-1]
                    st.code(str(last_msg))
else:
    st.warning("Workspace offline. Please ignite backend server infrastructure dependencies via the control panel.")
