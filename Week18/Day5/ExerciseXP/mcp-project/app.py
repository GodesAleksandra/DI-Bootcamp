import streamlit as st
import asyncio
from mcp_client import MCPClientManager
from agent_orchestrator import AgentOrchestrator

st.set_page_config(page_title="MCP Agent Workspace", layout="wide", page_icon="🤖")

st.title("🤖 MCP Multi-Server Agentic Orchestrator")
st.write("An enterprise-grade orchestration workspace coordinating local and community Model Context Protocol servers.")

# Initialize managers in session state
if "client_manager" not in st.session_state:
    st.session_state.client_manager = MCPClientManager()
    st.session_state.orchestrator = AgentOrchestrator(st.session_state.client_manager)
    st.session_state.initialized = False

# Sidebar Configurations
with st.sidebar:
    st.header("⚙️ Server Status & Config")
    github_cmd = st.text_input("GitHub MCP Server Command", "npx -y @modelcontextprotocol/server-github")
    fetch_cmd = st.text_input("Fetch MCP Server Command", "npx -y @modelcontextprotocol/server-fetch")
    
    if st.button("🔌 Start & Discover MCP Servers"):
        with st.spinner("Initializing processes..."):
            asyncio.run(st.session_state.client_manager.start_server("GitHubServer", github_cmd))
            asyncio.run(st.session_state.client_manager.start_server("FetchServer", fetch_cmd))
            st.session_state.initialized = True
            st.success("Connected to all MCP endpoints successfully!")

# Main Execution Canvas
if st.session_state.initialized:
    st.subheader("🛠️ Discovered Capabilities (Tools)")
    st.json(st.session_state.client_manager.get_all_tools())

    st.subheader("🎯 Define Agent Goal")
    user_input = st.text_area("What complex multi-step pipeline should the agent run?", 
                              "Fetch bug details from GitHub issue #42 and search the reference docs for troubleshooting hints.")

    if st.button("🚀 Execute Autonomous Plan"):
        log_container = st.container()
        
        def ui_logger(message):
            with log_container:
                st.markdown(message)

        with st.spinner("Agent running live loop..."):
            final_ans = asyncio.run(st.session_state.orchestrator.run_mission(user_input, log_callback=ui_logger))
            st.success("✨ Task Complete!")
            st.info(f"**Final Agent Summary:** {final_ans}")
else:
    st.warning("Please configure and connect to the MCP servers using the sidebar panel first.")