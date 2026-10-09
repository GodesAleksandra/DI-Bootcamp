import os
import shutil
import sys
from dotenv import load_dotenv

load_dotenv()

# Disable SSL certificate verification (useful behind corporate proxies or VPNs)
#os.environ["NODE_TLS_REJECT_UNAUTHORIZED"] = "0"
os.environ["NODE_OPTIONS"] = "--no-warnings --dns-result-order=ipv4first"

IGNORE_ROBOTS_TXT = os.getenv("MCP_IGNORE_ROBOTS_TXT", "false").lower() == "true"

LLM_BACKEND = os.getenv("LLM_BACKEND", "GROQ")
OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://localhost:11434")
#OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "qwen2.5:1.5b") 
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3")

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_MODEL = os.getenv("GROQ_MODEL", "qwen/qwen3.8-27b")

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN", "")
if GITHUB_TOKEN:
    os.environ["GITHUB_TOKEN"] = GITHUB_TOKEN

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))

NODE_EXE = shutil.which("node") or "node"
NPX_EXE = shutil.which("npx.cmd") or shutil.which("npx") or "npx"

GITHUB_SERVER_JS = os.path.join(PROJECT_ROOT, "node_modules", "@modelcontextprotocol", "server-github", "dist", "index.js")

GITHUB_MCP_COMMAND = [NODE_EXE, "--dns-result-order=ipv4first", GITHUB_SERVER_JS]

FETCH_MCP_COMMAND = [NPX_EXE, "-y", "mcp-fetch-server"]
if IGNORE_ROBOTS_TXT:
    FETCH_MCP_COMMAND.append("--ignore-robots-txt")
    
INSIGHT_SERVER_PATH = os.path.join(PROJECT_ROOT, "custom_insight_server.py")
INSIGHT_MCP_COMMAND = [sys.executable, INSIGHT_SERVER_PATH]

#DEFAULT_OWNER = "cli"
#DEFAULT_REPO = "cli"
#DEFAULT_ISSUE = 702
AGENT_MAX_TURNS = 8


