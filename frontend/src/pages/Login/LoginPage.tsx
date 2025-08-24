import React from "react";

const LoginPage: React.FC = () => {
  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      {/* Header */}
      <header style={{
  background: "#000",
  padding: "18px 40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%"
}}>
  <h1 style={{
    color: "#F5B82E",
    fontWeight: 700,
    fontSize: "28px",
    marginLeft: 0,
    fontFamily: "Arial, Helvetica, sans-serif"
  }}>
    Study Buddy Match
  </h1>
  <div style={{ marginRight: 0, display: "flex", gap: "16px" }}>
    <button style={{
      background: "#fff",
      color: "#000",
      borderRadius: "8px",
      border: "none",
      padding: "10px 28px",
      fontWeight: 600,
      fontSize: "18px",
      cursor: "pointer"
    }}>
      Sign In
    </button>
    <button style={{
      background: "#F5B82E",
      color: "#000",
      borderRadius: "8px",
      border: "none",
      padding: "10px 28px",
      fontWeight: 600,
      fontSize: "18px",
      cursor: "pointer"
    }}>
      Sign Up
    </button>
  </div>
</header>

      {/* Login Form */}
      <main style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "60px"
      }}>
        <div style={{
          background: "#fafafa",
          borderRadius: "16px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
          padding: "40px 48px",
          minWidth: "420px",
          maxWidth: "90vw",
          textAlign: "center"
        }}>
          <h2 style={{ fontWeight: 700, fontSize: "32px", marginBottom: "8px" }}>Welcome Back</h2>
          <p style={{ color: "#555", marginBottom: "24px" }}>
            Sign in to your Study Buddy Match account
          </p>
          <form>
            <div style={{ textAlign: "left", marginBottom: "16px" }}>
              <label htmlFor="email" style={{ fontWeight: 600 }}>Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  marginTop: "6px",
                  fontSize: "16px"
                }}
              />
            </div>
            <div style={{ textAlign: "left", marginBottom: "24px" }}>
              <label htmlFor="password" style={{ fontWeight: 600 }}>Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  marginTop: "6px",
                  fontSize: "16px"
                }}
              />
            </div>
            <button type="submit" style={{
              width: "100%",
              background: "#F5B82E",
              color: "#000",
              borderRadius: "8px",
              border: "none",
              padding: "14px 0",
              fontWeight: 600,
              fontSize: "20px",
              cursor: "pointer",
              marginBottom: "12px"
            }}>
              Sign In
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

      {/* Footer */}
      <footer style={{
        textAlign: "center",
        marginTop: "60px",
        color: "#555",
        fontSize: "18px"
      }}>
        © 2024 Study Buddy Match. All rights reserved.
      </footer>
    </div>
  );
};

export default LoginPage;