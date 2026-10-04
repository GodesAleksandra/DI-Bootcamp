# Enterprise MCP Application

An agentic orchestration application powered by the **Model Context Protocol (MCP)**, featuring LLM-driven reasoning loops (Groq / Ollama) and a Streamlit-based web interface.

## Prerequisites

- **Python** `3.10` or higher
- **Node.js** `18` or higher (required for hosting Node-based MCP tools/servers)

---

## Quick Start

### Step 1: Install Node.js Components
Install the external MCP servers and their components defined in your `package.json`:
```bash
npm install
```

### Step 2: Install Python Packages
Install the required dependencies directly into your environment:
```bash
pip install httpx streamlit python-dotenv
```

### Step 3: Configure Environment Variables
Create a `.env` file in the root directory of your project and populate it with your API credentials and backend preferences:

```env
# Choose your backend: GROQ or OLLAMA
LLM_BACKEND=GROQ

# Groq Cloud Settings
GROQ_API_KEY=gsk_your_real_secret_key_here
GROQ_MODEL=llama-3.3-70b-versatile

# Local Ollama Settings (used if LLM_BACKEND=OLLAMA)
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama3
```

### Step 4: Run the Application
Launch the Streamlit user interface by running:
```bash
python -m streamlit run app.py
```

---

## System Architecture

- **`mcp_client.py`**: Manages external MCP server lifecycles and handles asynchronous JSON-RPC multiplexing.
- **`agent_orchestrator.py`**: Coordinates the multi-turn agentic framework, utilizing strict `Thought-Action` loop formatting to resolve tasks using dynamic tool metadata.
- **`config.py`**: Holds structural boundaries, timeout limits, and controls automated sanitization to prevent sensitive parameters from escaping to logs.
