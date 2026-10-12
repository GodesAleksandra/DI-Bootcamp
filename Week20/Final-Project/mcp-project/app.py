import streamlit as st
import asyncio
import sys
import atexit
from mcp_client import MCPClientManager
from agent_orchestrator import AgentOrchestrator
import config
import os
import psycopg2
import jwt
import bcrypt
import datetime
import extra_streamlit_components as stx

st.set_page_config(
    page_title="SmartMCP Engine", 
    layout="wide", 
    page_icon="🤖"
)

st.title("🤖 SmartMCP: Intelligent GitHub Issue-to-Database Workflow")

cookie_manager = stx.CookieManager()

JWT_SECRET = getattr(config, "JWT_SECRET", "super_secret_enterprise_key_99f")
JWT_ALGORITHM = "HS256"

def get_db_connection():
    """Creates a clean, isolated connection to the PostgreSQL database."""
    return psycopg2.connect(
        host=getattr(config, "DB_HOST", "localhost"),
        database=getattr(config, "DB_NAME", "postgres"),
        user=getattr(config, "DB_USER", "postgres"),
        password=getattr(config, "DB_PASS", "password"),
        port=getattr(config, "DB_PORT", "5432")
    )

def init_user_authentication_table():
    """Automatically deploys the users table and creates the default admin."""
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        cur.execute("""
            CREATE TABLE IF NOT EXISTS workspace_users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password_hash BYTEA NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """)
        
        cur.execute("SELECT COUNT(*) FROM workspace_users;")
        if cur.fetchone()[0] == 0:
            default_password = "admin123"
            hashed_bytes = bcrypt.hashpw(default_password.encode('utf-8'), bcrypt.gensalt(12))
            
            cur.execute(
                "INSERT INTO workspace_users (username, password_hash) VALUES (%s, %s);",
                ("admin", hashed_bytes)
            )
            print("[DB Bootstrap] Default user 'admin' successfully seeded with password 'admin123'.", file=sys.stderr)
            
        conn.commit()
        cur.close()
        conn.close()
    except Exception as bootstrap_err:
        print(f"[DB Bootstrap Error] Fatal layout deployment failure: {bootstrap_err}", file=sys.stderr)

def verify_user_in_postgres(username: str) -> bytes:
    """Requests the user's password hash from a relational DBMS."""
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        cur.execute("SELECT password_hash FROM workspace_users WHERE username = %s;", (username,))
        row = cur.fetchone()
        
        cur.close()
        conn.close()
        return row[0] if row else None
    except Exception as db_err:
        st.error(f"🔌 Critical DBMS data error: {str(db_err)}")
        return None

def register_new_user_in_postgres(username: str, password_plain: str) -> bool:
    """Securely registers a new user with password hashing."""
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        cur.execute("SELECT id FROM workspace_users WHERE username = %s;", (username,))
        if cur.fetchone():
            st.error("❌ This username is already registered in the system.")
            cur.close()
            conn.close()
            return False
            
        hashed_bytes = bcrypt.hashpw(password_plain.encode('utf-8'), bcrypt.gensalt(12))
        
        cur.execute(
            "INSERT INTO workspace_users (username, password_hash) VALUES (%s, %s);",
            (username, hashed_bytes)
        )
        conn.commit()
        cur.close()
        conn.close()
        return True
    except Exception as db_err:
        st.error(f"🔌 Failed to save the user to the database: {str(db_err)}")
        return False

def generate_jwt_token(username: str) -> str:
    """Generates an encrypted JWT token (analogous to jwt.sign in Node.js)."""
    payload = {
        "sub": username,
        "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=8),
        "iat": datetime.datetime.now(datetime.timezone.utc)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def verify_jwt_token(token: str) -> str:
    """Verifies the token signature and returns the username (analogous to jwt.verify)."""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload["sub"]
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return None

init_user_authentication_table()

saved_token = cookie_manager.get("mcp_workspace_jwt")

if "username" not in st.session_state:
    st.session_state.username = None

if saved_token and not st.session_state.username:
    verified_user = verify_jwt_token(saved_token)
    if verified_user:
        st.session_state.username = verified_user

if not st.session_state.username:
    st.markdown("<h2 style='text-align: center;'>🔒 SmartMCP Secure Gateway</h2>", unsafe_allow_html=True)
    st.markdown("<p style='text-align: center; color: gray;'>Enterprise Authentication & Token Management Service</p>", unsafe_allow_html=True)
    
    tab_signin, tab_signup = st.tabs(["🔑 Sign In", "📝 Sign Up"])
    
    # --- Sign In ---
    with tab_signin:
        with st.container(border=True):
            st.subheader("Operator authorization")
            login_user = st.text_input("Username:", key="login_username")
            login_pass = st.text_input("Password:", type="password", key="login_password")
            
            if st.button("Log in to Workspace", type="secondary", use_container_width=True):
                if not login_user.strip() or not login_pass.strip():
                    st.error("Input fields cannot be empty.")
                else:
                    stored_hash = verify_user_in_postgres(login_user)
                    if stored_hash and bcrypt.checkpw(login_pass.encode('utf-8'), bytes(stored_hash)):
                        token = generate_jwt_token(login_user)
                        cookie_manager.set(
                            "mcp_workspace_jwt", 
                            token, 
                            expires_at=datetime.datetime.now() + datetime.timedelta(hours=8)
                        )
                        st.session_state.username = login_user
                        st.success("Successful login! Synchronizing...")
                        st.rerun()
                    else:
                        st.error("Incorrect username or password.")
                        
    # --- Sign Up ---
    with tab_signup:
        with st.container(border=True):
            st.subheader("Register a new account")
            reg_user = st.text_input("Create Username:", key="reg_username")
            reg_pass = st.text_input("Create Password:", type="password", key="reg_password")
            reg_pass_confirm = st.text_input("Confirm Password:", type="password", key="reg_password_confirm")
            
            if st.button("Create an account", type="secondary", use_container_width=True):
                if not reg_user.strip() or not reg_pass.strip():
                    st.error("The username and password cannot be empty.")
                elif len(reg_pass) < 6:
                    st.error("The password must contain at least 6 characters.")
                elif reg_pass != reg_pass_confirm:
                    st.error("The entered passwords do not match.")
                else:
                    success = register_new_user_in_postgres(reg_user, reg_pass)
                    if success:
                        st.success("🎉 Account successfully created! You can now go to the 'Sign In' tab and log in.")
                        
    st.stop()

# Synchronized session-state container setup
if "client_manager" not in st.session_state:
    st.session_state.client_manager = MCPClientManager()
    st.session_state.orchestrator = AgentOrchestrator(st.session_state.client_manager)
    st.session_state.servers_started = False
    st.session_state.show_db_panel = False #true if table DB, false if main screen

    def global_sync_teardown():
        try:
            loop = asyncio.new_event_loop()
            loop.run_until_complete(st.session_state.client_manager.shutdown())
            loop.close()
        except Exception:
            pass

    atexit.register(global_sync_teardown)

async def initialize_all_servers(manager: MCPClientManager):
    """Launches 2 servers sequentially with clean configurations to prevent deadlocks."""
    
    if getattr(config, "GITHUB_TOKEN", None):
        os.environ["GITHUB_TOKEN"] = config.GITHUB_TOKEN

    servers = {
        "GitHubServer": config.GITHUB_MCP_COMMAND,
        "InsightServer": config.INSIGHT_MCP_COMMAND
    }
    for name, cmd in servers.items():
        try:
            await manager.register_and_start(name, cmd)
            st.sidebar.success(f"✅ {name} initiated successfully!")
        except Exception as e:
            st.sidebar.error(f"❌ {name} failed: {e}")

def get_all_reports_from_db():
    """Directly requests all reports from Postgres, sorted by date in descending order."""
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT id, source, issue_number, generated_at, summary_report FROM architectural_reports ORDER BY generated_at DESC;")
        records = cur.fetchall()
        cur.close()
        conn.close()
        return records
    except Exception as db_err:
        return f"[Error] Failed to read database logs: {str(db_err)}"

# --- SIDEBAR ---
with st.sidebar:
    st.header("🌐 System Infrastructure Runtime")
    st.metric("LLM Backend Target", config.LLM_BACKEND)
    st.caption(f"Authenticated Operator: **{st.session_state.username}**")
    st.metric("Model Context", config.OLLAMA_MODEL if config.LLM_BACKEND == "OLLAMA" else config.GROQ_MODEL)
    
    if st.button("🔌 Establish Active Workspace Connectors", type="secondary", use_container_width=True):
        with st.spinner("Spawning infrastructure sub-processes and verifying JSON-RPC handshakes..."):
            try:
                loop = asyncio.get_event_loop()
            except RuntimeError:
                loop = asyncio.new_event_loop()
                asyncio.set_event_loop(loop)
                
            loop.run_until_complete(initialize_all_servers(st.session_state.client_manager))
            st.session_state.servers_started = True
            st.success("Infrastructure connected via JSON-RPC channels!")

    # Interactive toggle button for opening/closing the sliding data panel
    if st.session_state.servers_started:
        st.markdown("---")
        #st.header("📂 Data Storage Management")
        
        btn_label = "🔙 Return to Task Control Panel" if st.session_state.show_db_panel else "📊 View Postgres Reports Archive"
        
        if st.button(btn_label, type="secondary", use_container_width=True):
            st.session_state.show_db_panel = not st.session_state.show_db_panel
            st.rerun()
            
        if st.button("🚪 Sign Out", type="secondary", use_container_width=True):
            if "mcp_workspace_jwt" in st.context.cookies:
                del st.context.cookies["mcp_workspace_jwt"]
            st.session_state.username = None
            st.rerun()

# --- MAIN SCREEN ---
if st.session_state.servers_started:
    with st.expander("💡 Dynamic Discovered Capabilities Matrix (Tools)", expanded=False):
        st.json(st.session_state.client_manager.get_all_tools())
    
    # Displaying the hidden data panel from Postgres    
    if st.session_state.show_db_panel:
        st.header("📊 Production Database Ledger: `architectural_reports`")
        st.caption("Real-time telemetry and persistent outputs extracted from PostgreSQL. Sorted by generation timestamp (DESC).")
        
        if st.button("🔙 Close Archive & Back to Planner", type="secondary"):
            st.session_state.show_db_panel = False
            st.rerun()
            
        st.markdown("---")
        
        db_data = get_all_reports_from_db()
        
        if isinstance(db_data, str) and db_data.startswith("[Error]"):
            st.error(db_data)
        elif not db_data:
            st.warning("📭 The PostgreSQL table `architectural_reports` is currently empty. Run test scenarios to stream data.")
        else:
            for record in db_data:
                rec_id, source, issue_num, timestamp, report_content = record
                
                card_title = f"📦 Record ID: {rec_id} | Repository: {source} (Issue #{issue_num}) | Timestamp: {timestamp}"
                
                with st.container(border=True):
                    st.markdown(f"##### {card_title}")
                    st.text_area("Persistent Payload Content:", report_content, height=200, key=f"db_rec_{rec_id}")

    # TRADITIONAL PLANNING AND TESTING MAIN SCREEN
    else:
        st.markdown("#### 🎯 Target Analytical Mission")
        user_goal = st.text_area("Define workflow automation boundaries:", 
                                "Fetch bug details from GitHub issue #702 (owner: 'cli', repo: 'cli'), compile structural points and save the generated architectural summary report into the PostgreSQL database.",
            height=120
        )

        if st.button("🚀 Trigger Autonomous Planner Loop", type="secondary"):
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
                    st.error("⚠️ Orchestrator execution loop completed but returned an empty structural payload (None or Empty String).")
                    
                    if hasattr(st.session_state.orchestrator, 'memory') and st.session_state.orchestrator.memory:
                        st.warning("🔄 Attempting recovery: Displaying last snapshot from orchestrator memory context:")
                        last_msg = st.session_state.orchestrator.memory[-1]
                        st.code(str(last_msg))

        st.markdown("---")

        st.subheader("🛠️ DevOps Suite: Test Runner")
        st.caption("Execute the full matrix of 5 integration tests sequentially on full layout to verify Git & Postgres pipelines.")
        
        if st.button("🧪 Run Full 5-Scenario Suite", type="secondary", use_container_width=True):
            st.info("Starting Batch Execution Loop...")
            
            test_suite_issues = [14552, 702, 9000, 5315, 1452]
            
            test_progress_bar = st.progress(0.0)
            test_status_text = st.empty()
            test_log_canvas = st.empty()
            test_logs = []

            loop = asyncio.get_event_loop()
            
            for index, issue_id in enumerate(test_suite_issues):
                current_percentage = (index + 1) / len(test_suite_issues)
                test_status_text.markdown(f"**Processing Scenario {index+1}/5:** GitHub Instance `#{issue_id}`")
                test_progress_bar.progress(current_percentage)
                
                test_goal = f"Fetch bug details from GitHub issue #{issue_id} (owner: 'cli', repo: 'cli'), compile structural points and save the generated architectural summary report into the PostgreSQL database."
                
                test_logs.append(f"--- 🧪 STARTING SCENARIO FOR ISSUE #{issue_id} ---")
                test_log_canvas.code("\n".join(test_logs))
                
                def agent_test_callback(msg):
                    test_logs.append(f"  {msg}")
                    test_log_canvas.code("\n".join(test_logs))

                try:
                    report_output = loop.run_until_complete(
                        st.session_state.orchestrator.run_mission(test_goal, log_callback=agent_test_callback)
                    )
                    report_str = str(report_output).lower()
                    
                    if "rate limit reached" in report_str or "429" in report_str:
                        raise RuntimeError("Transaction aborted: Groq TPD Rate Limit reached. Data not processed.")
                    elif "mission failed" in report_str or "budget exhausted" in report_str:
                        raise RuntimeError("Transaction aborted: Orchestrator failed to converge to database tool call.")
                    elif "[error]" in report_str:
                        raise RuntimeError(f"Database write rejected: {report_output}")
                    
                    test_logs.append(f"✅ Success: Issue #{issue_id} safely committed to Postgres.\n")
                    
                except Exception as suite_err:
                    test_logs.append(f"❌ Failure on Issue #{issue_id}: {str(suite_err)}")
                    test_logs.append("⚠️ State Rollback: Database record omitted due to pipeline failure.\n")
                
                test_log_canvas.code("\n".join(test_logs))
                
            #test_status_text.success("🎉 Integration Suite Execution Complete!")
            test_status_text.error("⚠️ Suite execution finished with validation errors. Review logs above.")
else:
    st.warning("Workspace offline. Please ignite backend server infrastructure dependencies via the control panel.")
