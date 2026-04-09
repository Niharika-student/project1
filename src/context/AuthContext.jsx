import { createContext, useContext, useMemo, useState } from "react";
import { apiUrl } from "../config/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("portal-user");
    return saved ? JSON.parse(saved) : null;
  });

  /**
   * Admin registers student in DB, so students do NOT self-register from frontend.
   * If you still want student self-registration later, we can add an API call here.
   */
  const registerStudent = async () => {
    return {
      ok: false,
      message: "Student registration is handled by Admin only.",
    };
  };

  const login = async ({ role, email, password }) => {
    const normalizedRole = role?.trim().toLowerCase();
    const username = (email || "").trim(); // your UI uses email field; treat it as username/rollNumber
    const pwd = (password || "").trim();

    if (!username || !pwd) {
      return { ok: false, message: "Enter both identifier and password." };
    }

    if (normalizedRole !== "admin" && normalizedRole !== "student") {
      return { ok: false, message: "Unsupported role selected." };
    }

    const endpoint =
      normalizedRole === "admin"
        ? "/api/auth/admin/login"
        : "/api/auth/student/login";

    try {
      const res = await fetch(apiUrl(endpoint), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password: pwd }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        return { ok: false, message: err.message || "Login failed." };
      }

      const data = await res.json(); // { message: "ADMIN_LOGIN_SUCCESS" } or "STUDENT_LOGIN_SUCCESS"

      const loggedInUser =
        normalizedRole === "admin"
          ? {
              role: "admin",
              name: "Administrator",
              username,
              initials: "AD",
              message: data.message,
            }
          : {
              role: "student",
              name: username, // we don't have name from login API now; keep rollNumber as display
              username,
              initials: "ST",
              message: data.message,
            };

      setUser(loggedInUser);
      localStorage.setItem("portal-user", JSON.stringify(loggedInUser));
      return { ok: true, message: data.message };
    } catch (e) {
      return { ok: false, message: "Server not reachable. Start backend (8081)." };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("portal-user");
  };

  const value = useMemo(
    () => ({ user, login, logout, registerStudent }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}