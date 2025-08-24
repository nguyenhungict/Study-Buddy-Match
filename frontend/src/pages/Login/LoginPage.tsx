import React, { useState } from "react";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); setMsg(null); setErr(null);

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.msg || `HTTP ${res.status}`);

      if (data?.token) localStorage.setItem("token", data.token);
      setMsg("Sign in successful!");
    } catch (e: any) {
      setErr(e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      {/* Header */}
      <header style={{
        background: "#000", padding: "18px 40px", display: "flex",
        alignItems: "center", justifyContent: "space-between", width: "100%"
      }}>
        <h1 style={{ color: "#F5B82E", fontWeight: 700, fontSize: "28px", marginLeft: 0, fontFamily: "Arial, Helvetica, sans-serif" }}>
          Study Buddy Match
        </h1>
        <div style={{ marginRight: 0, display: "flex", gap: "16px" }}>
          <a href="/login"><button style={{
            background: "#fff", color: "#000", borderRadius: "8px", border: "none",
            padding: "10px 28px", fontWeight: 600, fontSize: "18px", cursor: "pointer"
          }}>Sign In</button></a>
          <a href="/signup"><button style={{
            background: "#F5B82E", color: "#000", borderRadius: "8px", border: "none",
            padding: "10px 28px", fontWeight: 600, fontSize: "18px", cursor: "pointer"
          }}>Sign Up</button></a>
        </div>
      </header>

      {/* Login Form */}
      <main style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "60px" }}>
        <div style={{
          background: "#fafafa", borderRadius: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
          padding: "40px 48px", minWidth: "420px", maxWidth: "90vw", textAlign: "center"
        }}>
          <h2 style={{ fontWeight: 700, fontSize: "32px", marginBottom: "8px" }}>Welcome Back</h2>
          <p style={{ color: "#555", marginBottom: "24px" }}>Sign in to your Study Buddy Match account</p>

          <form onSubmit={onSubmit}>
            <div style={{ textAlign: "left", marginBottom: "16px" }}>
              <label htmlFor="email" style={{ fontWeight: 600 }}>Email</label>
              <input id="email" name="email" type="email" placeholder="Enter your email" required
                style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", marginTop: "6px", fontSize: "16px" }} />
            </div>
            <div style={{ textAlign: "left", marginBottom: "24px" }}>
              <label htmlFor="password" style={{ fontWeight: 600 }}>Password</label>
              <input id="password" name="password" type="password" placeholder="Enter your password" required
                style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", marginTop: "6px", fontSize: "16px" }} />
            </div>

            {err && <div style={{ color: "#b91c1c", marginBottom: 12 }}>{err}</div>}
            {msg && <div style={{ color: "#0f766e", marginBottom: 12 }}>{msg}</div>}

            <button type="submit" disabled={loading} style={{
              width: "100%", background: "#F5B82E", color: "#000", borderRadius: "8px",
              border: "none", padding: "14px 0", fontWeight: 600, fontSize: "20px",
              cursor: "pointer", marginBottom: "12px", opacity: loading ? 0.7 : 1
            }}>
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>

          <div style={{ marginBottom: "12px" }}>
            <a href="/reset-password" style={{ color: "#555", textDecoration: "underline", fontSize: "16px" }}>
              Forgot your password?
            </a>
          </div>
          <div>
            <span style={{ color: "#555", fontSize: "16px" }}>
              Don't have an account?{" "}
              <a href="/signup" style={{ color: "#000", textDecoration: "underline", fontWeight: 600 }}>
                Sign up
              </a>
            </span>
          </div>
        </div>
      </main>

      <footer style={{ textAlign: "center", marginTop: "60px", color: "#555", fontSize: "18px" }}>
        © 2024 Study Buddy Match. All rights reserved.
      </footer>
    </div>
  );
};

export default LoginPage;
