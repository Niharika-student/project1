import { useState } from "react";
import { BadgeCheck, FileText, GraduationCap, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function StudentLogin() {
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const result = await login({ role: "student", email: rollNumber, password });

    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate("/student");
  };

  return (
    <div className="auth-page">
      <div className="auth-split">
        <section className="auth-hero student-theme">
          <p className="landing-kicker">Student Portal</p>
          <h2>Track records, assigned teacher support, and course activity.</h2>
          <p>A calm, clean workspace built for quick updates and easy review.</p>
          <div className="hero-badges">
            <span><GraduationCap size={14} /> Student workspace</span>
            <span><BadgeCheck size={14} /> Verified records</span>
            <span><FileText size={14} /> Suggestions</span>
          </div>
        </section>

        <form className="auth-card" onSubmit={handleSubmit}>
          <div className="auth-card-head">
            <div className="auth-icon"><Sparkles size={18} /></div>
            <div>
              <h2>Student Login</h2>
              <p>Use the Roll Number and password given by admin.</p>
            </div>
          </div>

          <input
            className="form-input"
            value={rollNumber}
            onChange={(event) => setRollNumber(event.target.value)}
            placeholder="Roll Number"
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
        </form>
      </div>
    </div>
  );
}

export default StudentLogin;