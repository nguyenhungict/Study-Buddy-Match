"use client";

import type React from "react";
import { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassRouter: React.FC = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  // Lấy token từ URL /resetpass?token=...
  const token = useMemo(() => new URLSearchParams(search).get("token") || "", [search]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!token) {
      setError("Invalid or expired link. Please request a new reset email.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Gửi cả 2 trường để middleware passwordPolicy và route đều OK
        body: JSON.stringify({ token, password, newPassword: password }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.msg || `HTTP ${response.status}`);

      setMessage("Password reset successfully! Redirecting to sign in…");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      setError(err?.message || "Unable to connect to the server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      {/* Header */}
      <header
        style={{
          background: "#000",
          padding: "18px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <h1
          style={{
            color: "#F5B82E",
            fontWeight: 700,
            fontSize: "28px",
            marginLeft: 0,
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          Study Buddy Match
        </h1>
        <div style={{ marginRight: 0, display: "flex", gap: "16px" }}>
          <a href="/login">
            <button
              style={{
                background: "#fff",
                color: "#000",
                borderRadius: "8px",
                border: "none",
                padding: "10px 28px",
                fontWeight: 600,
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              Sign In
            </button>
          </a>
          <a href="/signup">
            <button
              style={{
                background: "#F5B82E",
                color: "#000",
                borderRadius: "8px",
                border: "none",
                padding: "10px 28px",
                fontWeight: 600,
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              Sign Up
            </button>
          </a>
        </div>
      </header>

      {/* Reset Password Form */}
      <main style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "60px" }}>
        <div
          style={{
            background: "#fafafa",
            borderRadius: "16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
            padding: "40px 48px",
            minWidth: "420px",
            maxWidth: "90vw",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontWeight: 700, fontSize: "32px", marginBottom: "8px" }}>Reset Your Password</h2>
          <p style={{ color: "#555", marginBottom: "24px" }}>Enter your new password below</p>

          <form onSubmit={handleSubmit}>
            <div style={{ textAlign: "left", marginBottom: "20px" }}>
              <label htmlFor="password" style={{ fontWeight: 600 }}>
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your new password"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  marginTop: "6px",
                  fontSize: "16px",
                }}
              />
            </div>

            <div style={{ textAlign: "left", marginBottom: "24px" }}>
              <label htmlFor="confirmPassword" style={{ fontWeight: 600 }}>
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  marginTop: "6px",
                  fontSize: "16px",
                }}
              />
            </div>

            {error && <div style={{ color: "#b91c1c", marginBottom: 12 }}>{error}</div>}
            {message && <div style={{ color: "#0f766e", marginBottom: 12 }}>{message}</div>}

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                background: "#F5B82E",
                color: "#000",
                borderRadius: "8px",
                border: "none",
                padding: "14px 0",
                fontWeight: 600,
                fontSize: "20px",
                cursor: "pointer",
                marginBottom: "12px",
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              {isLoading ? "Processing..." : "Reset Password"}
            </button>
          </form>

          <div>
            <a href="/login" style={{ color: "#555", textDecoration: "underline", fontSize: "16px" }}>
              Back to sign in
            </a>
          </div>
        </div>
      </main>

      <footer style={{ textAlign: "center", marginTop: "60px", color: "#555", fontSize: "18px" }}>
        © 2024 Study Buddy Match. All rights reserved.
      </footer>
    </div>
  );
};

export default ResetPassRouter;
