# Enterprise MCP Application

An agentic orchestration application powered by the **Model Context Protocol (MCP)**, featuring LLM-driven reasoning loops (Groq / Ollama) and a Streamlit-based web interface.

---

## Installation & Deployment Guide

### Prerequisites
* **Python 3.10 or higher** (Fully validated on Python 3.12.9)
* **Node.js 18 or higher** (Required to execute `npx` commands for the fetch and GitHub servers)

### Step 1: Clone and Install Python Dependencies
Install all front-end UI and backend orchestration packages natively via the audited dependency sheet:
```bash
pip install -r requirements.txt
```

### Step 2: Configure Environment Variables
Create a `.env` file in the root directory of the project to manage API routing parameters securely:
```env
LLM_BACKEND=GROQ
GROQ_API_KEY=gsk_your_private_groq_api_credential_here
GROQ_MODEL=qwen/qwen3.8-27b
GITHUB_TOKEN=ghp_your_personal_access_token_here

# Opt-in Corporate Network Constraints (Default is secure/strict)
# MCP_DISABLE_SSL_VERIFY=false
# MCP_IGNORE_ROBOTS_TXT=false
```

### Step 3: Launch the Graphical UI
Execute the Streamlit web app server to access the agent's real-time workspace log and visualization panels:
```bash
streamlit run app.py
```

### Step 4: Run the Application
Launch the Streamlit user interface by running:
```bash
python -m streamlit run app.py
```

## Active MCP Tool Inventory

Once launched, the system dynamically discovers and maps the following functional primitives:
* `fetch_readable` (via Node.js NPX layer) - Strips tracking scripts and reads clean markdown context from raw URLs.
* `get_issue` (via `@modelcontextprotocol/server-github`) - Fetches target engineering bug parameters.
* `insight_save_report` (via `custom_insight_server.py`) - Natively transforms text summaries into physical files on disk with collision-proof timestamps (`%Y%m%d_%H%M%S`).
---
## Architectural Architecture & Ecosystem Splits

The application utilizes a **hybrid multi-runtime environment** to delegate specialized sub-tasks efficiently:
1. **Python Layer:** Handles core agent logic (`agent_orchestrator.py`), configuration management (`config.py`), user interface layer (`app.py`), the central connection broker (`mcp_client.py`) that manages sessions with external tools, and the custom metrics-saving tool (`custom_insight_server.py`).
2. **Node.js Layer:** Dynamically provisions runtime web scrapers (`mcp-fetch-server`) and structured enterprise endpoints (`@modelcontextprotocol/server-github`) via `npx` directly inside the sub-process pipes.

### Clarification on Hidden Dependencies:
* **`mcp` (Python SDK):** **Not Required.** The custom analytics server is built natively on asynchronous JSON-RPC streams over standard I/O (`stdin`/`stdout`), minimizing system memory overhead.
* **`mcp-server-fetch`:** This is an isolated Node.js application launched on-demand using `npx.cmd`. It does not require installation inside the Python package manager.
* **`asyncio`:** Built directly into the Python Standard Library.

