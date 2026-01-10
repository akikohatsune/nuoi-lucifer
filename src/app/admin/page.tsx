"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  inMemoryPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import "./style.css";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/blog");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await setPersistence(auth, inMemoryPersistence);
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace("/blog");
    } catch (err) {
      const message =
        (err as any)?.code ||
        (err as any)?.message ||
        "Could not sign in. Please check your credentials.";
      setError(message);
      console.error("Sign-in failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="login-card">
        <h1 className="title">Login</h1>
        <p className="subtitle">
          Sign in with account to manage blog content.
        </p>
        <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="text-input"
            type="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />

          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="text-input"
            type="password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
          />

          <button className="primary-btn" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
          <p className="helper">
            Accounts are managed in Firebase Auth. Contact an admin if you need access!
          </p>
        </form>

        {error && <div className="error-msg">{error}</div>}
      </div>
      <SpeedInsights />
      <Analytics />
    </div>
  );
}
