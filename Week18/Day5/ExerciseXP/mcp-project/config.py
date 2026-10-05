import os
import shutil
import sys
from dotenv import load_dotenv

load_dotenv()

LLM_BACKEND = os.getenv("LLM_BACKEND", "OLLAMA")
OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "qwen2.5:1.5b") 

# Настройки Groq (если переключите бэкенд)
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN", "")
if GITHUB_TOKEN:
    os.environ["GITHUB_TOKEN"] = GITHUB_TOKEN

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
NODE_EXE = shutil.which("node") or "node"

GITHUB_SERVER_JS = os.path.join(PROJECT_ROOT, "node_modules", "@modelcontextprotocol", "server-github", "dist", "index.js")
FETCH_SERVER_JS = os.path.join(PROJECT_ROOT, "node_modules", "mcp-server-fetch-typescript", "dist", "index.js")

GITHUB_MCP_COMMAND = [NODE_EXE, "--use-openssl-ca", GITHUB_SERVER_JS]

FETCH_MCP_COMMAND = [sys.executable, "-m", "mcp_server_fetch"]
INSIGHT_MCP_COMMAND = [sys.executable, "custom_insight_server.py"]

DEFAULT_OWNER = "cli"
DEFAULT_REPO = "cli"
DEFAULT_ISSUE = 702

SENSITIVE_KEYS = ["gsk_", "github_pat", "ghp_", "SECRET", "PASSWORD", "API_KEY"]
