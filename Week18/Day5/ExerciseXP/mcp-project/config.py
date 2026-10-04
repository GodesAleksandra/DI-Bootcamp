import os
import shutil
from dotenv import load_dotenv

load_dotenv()

LLM_BACKEND = os.getenv("LLM_BACKEND", "OLLAMA")
OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://127.0.0.1:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "qwen2.5:1.5b") 
#"llama3"

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN", "")
if GITHUB_TOKEN:
    os.environ["GITHUB_TOKEN"] = GITHUB_TOKEN

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
NODE_EXE = shutil.which("node") or "node"

GITHUB_SERVER_JS = os.path.join(PROJECT_ROOT, "node_modules", "@modelcontextprotocol", "server-github", "dist", "index.js")
FETCH_SERVER_JS = os.path.join(PROJECT_ROOT, "node_modules", "mcp-server-fetch-typescript", "dist", "index.js")

GITHUB_MCP_COMMAND = f'"{NODE_EXE}" --use-openssl-ca "{GITHUB_SERVER_JS}"'
FETCH_MCP_COMMAND = f'"{NODE_EXE}" --use-openssl-ca "{FETCH_SERVER_JS}"'

DEFAULT_OWNER = "cli"
DEFAULT_REPO = "cli"
DEFAULT_ISSUE = 702

SENSITIVE_KEYS = ["gsk_", "github_pat", "ghp_", "SECRET", "PASSWORD", "API_KEY"]
