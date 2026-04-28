import { useState } from "react";
import { ShieldCheck, LayoutDashboard, Users, ClipboardCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    // NOTE: AuthContext.login expects { role, email, password }
    // We pass username in "email" field to keep compatibility.
    const result = await login({ role: "admin", email: username, password });

    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate("/admin");
  };

  return (
    <div className="auth-page">
      <div className="auth-split">
        <section className="auth-hero">
          <p className="landing-kicker">Admin Portal</p>
          <h2>Manage approvals and records with a clean workspace.</h2>
          <p>Designed for quick navigation, readable cards, and working controls.</p>
          <div className="hero-badges">
            <span><LayoutDashboard size={14} /> Workspace</span>
            <span><Users size={14} /> Student directory</span>
            <span><ClipboardCheck size={14} /> Approvals</span>
          </div>
        </section>

        <form className="auth-card" onSubmit={handleSubmit}>
          <div className="auth-card-head">
            <div className="auth-icon"><ShieldCheck size={18} /></div>
            <div>
              <h2>Admin Login</h2>
              <p>Sign in with your admin username and password.</p>
            </div>
          </div>

          <input
            className="form-input"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
          />

          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
          />

          {error && <p className="login-error">{error}</p>}

          <button className="btn btn-primary" type="submit">Login</button>

          <p style={{ margin: 0, fontSize: '0.95rem', color: '#64748B' }}>
            Need a new admin account? <Link to="/admin/signup">Signup here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;