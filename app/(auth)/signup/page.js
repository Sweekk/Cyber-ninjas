"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";


export default function SignupPage() {
 
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSignup(e) {
    e.preventDefault();

    const { user } = await createUserWithEmailAndPassword(
      auth,
      form.email,
      form.password
    );

    await updateProfile(user, { displayName: form.name });

    await setDoc(doc(db, "users", user.uid), {
      name: form.name,
      email: form.email,
      role: form.role,
      createdAt: serverTimestamp(),
    });

    router.push(
      form.role === "provider"
        ? "/register"
        : "/dashboard"
    );
  }

  return (
    <main className="auth-bg">
      <form onSubmit={handleSignup} className="auth-card">
        <h2 className="auth-title">Sign Up</h2>

        <input name="name" placeholder="Full Name" required className="input" onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" required className="input" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" required className="input" onChange={handleChange} />

        <select name="role" className="input" onChange={handleChange}>
          <option value="user">Looking to Hire</option>
          <option value="provider">Offering a Job</option>
        </select>

        <button className="btn-primary">Create Account</button>
      </form>
    </main>
  );
}
