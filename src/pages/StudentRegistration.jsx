// src/pages/StudentRegistration.jsx
import { useNavigate } from "react-router-dom";

function StudentRegistration() {
  const navigate = useNavigate();

  return (
    <div className="auth-page">
      <div className="auth-split">
        <section className="auth-hero student-theme">
          <p className="landing-kicker">Student Registration</p>
          <h2>Registration is done by Admin</h2>
          <p>
            Please contact the admin to get your <b>Roll Number</b> and <b>Password</b>.
            After that, login from the Student Login page.
          </p>
        </section>

        <div className="auth-card">
          <h2>Go to Student Login</h2>
          <p className="login-error" style={{ color: "#1d7d4c" }}>
            Self-registration is disabled in this portal.
          </p>

          <div className="form-actions">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => navigate("/student/login")}
            >
              Go to Login
            </button>

            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentRegistration;