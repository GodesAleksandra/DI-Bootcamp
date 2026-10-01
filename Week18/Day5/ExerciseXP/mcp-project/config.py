import os
from dotenv import load_dotenv

load_dotenv()

LLM_BACKEND = os.getenv("LLM_BACKEND", "groq").lower()
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama3-70b-8192")

OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3")

GITHUB_MCP_COMMAND = os.getenv("GITHUB_MCP_COMMAND", "npx -y @modelcontextprotocol/server-github")
FETCH_MCP_COMMAND = os.getenv("FETCH_MCP_COMMAND", "npx -y @modelcontextprotocol/server-fetch")