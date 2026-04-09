import { useState } from "react";
import { UserPlus } from "lucide-react";
import { apiUrl } from "../config/api";

function AdminStudentRegistration() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    year: "Freshman",
    username: "", // will be saved as rollNumber in DB
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // optional: show recently registered students (from this page only)
  const [registered, setRegistered] = useState([]);

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const register = async (event) => {
    event.preventDefault();
    setMessage("");

    const payload = {
      rollNumber: form.username.trim(),        // IMPORTANT: username -> rollNumber
      name: form.name.trim(),
      email: form.email.trim(),
      grade: form.department.trim(),           // department -> grade (temporary mapping)
      password: form.password.trim(),
    };

    if (!payload.rollNumber || !payload.password) {
      setMessage("Login username (Roll Number) and password are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(apiUrl("/api/students/register"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setMessage(err.message || "Student registration failed.");
        setLoading(false);
        return;
      }

      const saved = await res.json();
      setMessage(`Student ${saved.name || payload.name} registered. Roll Number: ${saved.rollNumber}`);

      // reset form
      setForm({
        name: "",
        email: "",
        department: "",
        year: "Freshman",
        username: "",
        password: "",
      });

      // store in local table view (optional)
      setRegistered((prev) => [
        {
          id: saved.id,
          rollNumber: saved.rollNumber,
          name: saved.name,
          email: saved.email,
          grade: saved.grade,
          // NOTE: do not display password ideally, but keeping if you want:
          password: payload.password,
          year: form.year,
        },
        ...prev,
      ]);
    } catch (e) {
      setMessage("Backend not reachable. Start Spring Boot on 8081.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-stack">
      <div className="page-hero compact">
        <div>
          <p className="landing-kicker">Student Registration</p>
          <h3 className="page-hero-title">Register new students with a dedicated admin form.</h3>
          <p className="page-hero-copy">This will save students in the database (MySQL).</p>
        </div>
        <div className="hero-badges">
          <span><UserPlus size={14} /> Add student profile</span>
        </div>
      </div>

      <h3 className="section-title">Register Student</h3>

      <form className="auth-card form-card" onSubmit={register}>
        <input
          className="form-input"
          value={form.name}
          onChange={(event) => update("name", event.target.value)}
          placeholder="Student name"
        />

        <input
          className="form-input"
          value={form.email}
          onChange={(event) => update("email", event.target.value)}
          placeholder="Student email"
        />

        <input
          className="form-input"
          value={form.username}
          onChange={(event) => update("username", event.target.value)}
          placeholder="Roll Number (Login username)"
        />

        <input
          className="form-input"
          type="password"
          value={form.password}
          onChange={(event) => update("password", event.target.value)}
          placeholder="Login password"
        />

        <input
          className="form-input"
          value={form.department}
          onChange={(event) => update("department", event.target.value)}
          placeholder="Department (saved as Grade for now)"
        />

        <select
          className="form-select"
          value={form.year}
          onChange={(event) => update("year", event.target.value)}
        >
          <option value="Freshman">Freshman</option>
          <option value="Sophomore">Sophomore</option>
          <option value="Junior">Junior</option>
          <option value="Senior">Senior</option>
        </select>

        {message && <p className="page-message">{message}</p>}

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register Student"}
        </button>
      </form>

      {registered.length > 0 && (
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Roll Number</th>
                <th>Name</th>
                <th>Email</th>
                <th>Grade</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {registered.map((student) => (
                <tr key={`${student.id}-${student.rollNumber}`}>
                  <td>{student.id}</td>
                  <td>{student.rollNumber}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.grade}</td>
                  <td>{student.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default AdminStudentRegistration;