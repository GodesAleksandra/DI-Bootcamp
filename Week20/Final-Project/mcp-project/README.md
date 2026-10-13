# 🤖 SmartMCP: Intelligent GitHub Issue-to-Database AI Workflow

SmartMCP is an enterprise-grade AI Orchestrator application built with **Python 3.12 (Streamlit & Uvicorn)**, fully containerized via **Docker Compose**, and driven by the **Model Context Protocol (MCP)**. 

The application connects to external code repositories, automates complex software bug analysis, and safely saves structured **Architectural Summary Reports** directly into a **PostgreSQL 16** database ledger.

---

## 🚀 Core Features

*   **🔒 Secure Gateway System:** Protects the workspace cockpit using encrypted **JWT tokens** (HS256) cached in browser cookies for 8 hours, backed by standard database-side user password hashing via **bcrypt**.
*   **🔌 Automated MCP Tool Discovery:** Spawns isolated microservices (a Node.js-based `GitHubServer` and a custom Python `InsightServer`) via JSON-RPC. It automatically maps up to **29 tools** for fetching repository data.
*   **🧠 Flexible Dual-LLM Backend Engine:**
    *   **Ollama (Local Setup):** Optimized to run lightweight models (like `qwen2.5:1.5b`) within resource-constrained architectures. Built with **6GB Linux Swap partition** configurations and custom **180-second `httpx` async timeouts** to run safely on cheap **AWS EC2 servers (1GB RAM)**.
    *   **Groq (Cloud Setup):** Leverages advanced cloud models (like `qwen/qwen3.8-27b`) with dedicated `reasoning_effort: "none"` instructs to get clean, fast JSON tool blocks instantly.
*   **🧪 DevOps Batch Test Runner:** Includes a simulation engine to run a suite of **5 integration scenarios** sequentially. It validates data paths, monitors token rate limits, and triggers pipeline state rollbacks on execution breaks.
*   **📊 Production Database Archive:** Employs an interactive UI panel reading live records from the PostgreSQL `architectural_reports` table, sorted chronologically.

---

## 🛠️ Infrastructure & System Architecture

```text
       +------------------[ Secure Operator Session (Browser UI) ]------------------+

       |                                                                            |
       |     +-------------------------+                 +--------------------+     |
       |     |  Sign In / Auth Gateway |                 | Postgres Reports   |     |
       |     |  (JWT & Bcrypt Cookie)  |                 | Ledger Archive UI  |     |
       |     +------------+------------+                 +---------+----------+     |
       +------------------|----------------------------------------|----------------+

                          | (Authorized REST)                      | (Live Sync)
                          v                                        v
+-----------------[ smartmcp_app_container: Streamlit Workspace Cockpit ]-----------+

|                                                                                   |
|   +--------------------------+           +------------------------------------+   |
|   |  Autonomous Orchestrator |---------->| JSON-RPC Process Multiplexer Channels|   |
|   |  Multi-Turn Action Loop  |           +-----------------+------------------+   |
|   +------------+-------------+                             |                      |
|                |                                           | (Async Subprocess)   |
|                | (HTTP API REST)                           v                      |
|                |                        +------------------+------------------+   |
|                |                        | mcp_client.py Core Execution Engine |   |
|                v                        +--------+-------------------+--------+   |
|   +------------+------------+                    |                   |            |
|   | LLM Inference Backends  |                    |                   |            |
|   |  - OLLAMA (Local 1.5B)  |                    v                   v            |
|   |  - GROQ (Cloud 27B)     |          +---------+--------+ +--------+--------+   |
|   +-------------------------+          | Node.js          | | Python          |   |
|                                        | GitHubServer     | | InsightServer   |   |
|                                        | (26 Active Tools)| | (3 Active Tools)|   |
|                                        +------------------+ +-----------------+   |
+-----------------------------------------------------------------------------------+
                                                                     |
                                                                     | (SQL Commit)
                                                                     v
                                                   +-----------------+------------------+

                                                   | smartmcp_db_container (Postgres 16)|
                                                   |  - workspace_users Ledger Table    |
                                                   |  - architectural_reports Schema    |
                                                   +------------------------------------+
```

---

## 📦 Project Directory Layout

```text
.
├── app.py                  # Main Streamlit Graphical Cockpit Interface & Router
├── agent_orchestrator.py   # Multi-turn autonomous planning loop algorithm engine
├── mcp_client.py           # Core JSON-RPC multiplexer managing background server tasks
├── config.py               # Global system configuration and path environment keys
├── Dockerfile              # Multi-stage production build configuration (Node/Python)
├── docker-compose.yml      # Service infrastructure topology descriptor file
├── requirements.txt        # Python package dependencies manifest file
└── .env                    # Local production environmental credentials ledger (Hidden)
```

---

## ⚡ Quick Deployment Guide (AWS / Localhost)

### 1. Configure the Credentials Ledger
Create a `.env` file in the root directory of your project folder:
```env
# Database Initialization Parameters
DB_PASSWORD_SECRET=your_secure_password

# External Cloud API Integration Keys
GITHUB_TOKEN=ghp_your_actual_github_access_token_here
GROQ_API_KEY=gsk_your_actual_groq_cloud_api_key_here
LLM_BACKEND=GROQ

# Model Target Alignments
OLLAMA_MODEL=qwen2.5:1.5b
GROQ_MODEL=qwen/qwen3.8-27b
```

### 2. Ignite the Container Infrastructure
Build and activate all services in detached background mode:
```bash
docker compose up --build -d
```

### 3. Open the Cockpit UI Workspace
Once deployment logs stabilize, open your browser and navigate to the live interface address:
* **Localhost URL:** `http://localhost:8501`
* **AWS Server URL:** `http://<YOUR_AWS_PUBLIC_IP>:8501`

Use the default credentials created by the database seeder on runtime startup:
* **Username:** `admin`
* **Password:** `admin123`

---

## ⚖️ License
This project is open-source and licensed under the terms of the MIT License.
