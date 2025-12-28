"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      // 🔐 Firebase Auth login
      const { user } = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 1️⃣ Get user role
      const userSnap = await getDoc(doc(db, "users", user.uid));
      const role = userSnap.data().role;

      // 2️⃣ Normal user → dashboard
      if (role === "user") {
        router.push("/user/dashboard");
        return;
      }

      // 3️⃣ Provider → check registration
      const providerSnap = await getDoc(
        doc(db, "providers", user.uid)
      );

      if (providerSnap.exists()) {
        router.push("/provider-dashboard");
      } else {
        router.push("/register");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  }

  async function resetPassword() {
    if (!email) {
      alert("Enter your email first");
      return;
    }

    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent");
  }

  return (
    <main className="auth-bg">
      <form onSubmit={handleLogin} className="auth-card">
        <h2 className="auth-title">Login</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="input"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="input"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <p onClick={resetPassword} className="link-right">
          Forgot password?
        </p>

        <button className="btn-primary">Login</button>

        <p className="text-center">
          Don’t have an account?{" "}
          <span
            className="link"
            onClick={() => router.push("/signup")}
          >
            Sign up
          </span>
        </p>
      </form>
    </main>
  );
}
