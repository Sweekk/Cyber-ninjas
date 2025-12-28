"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../hooks/useAuth";

export default function ProviderRegister() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [data, setData] = useState({
    skill: "",
    experience: "",
    location: "",
    description: "",
  });

  // 🔐 Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  // ⏳ Loading UI (same theme)
  if (loading) {
    return (
      <main className="auth-bg">
        <div className="text-white text-lg">Loading...</div>
      </main>
    );
  }

  if (!user) return null;

  async function handleSubmit(e) {
    e.preventDefault();

    await setDoc(doc(db, "providers", user.uid), {
      uid: user.uid,
      email: user.email,
      ...data,
      createdAt: serverTimestamp(),
    });

    router.push("/provider-dashboard");
  }

  return (
    <main className="auth-bg">
      <form onSubmit={handleSubmit} className="auth-card">
        <h2 className="auth-title">Provider Registration</h2>

        <p className="text-center text-gray-500 mb-4">
          Tell us about the service you offer
        </p>

        <input
          type="text"
          placeholder="Skill / Job Role (e.g. Electrician, Tutor)"
          className="input"
          required
          onChange={(e) =>
            setData({ ...data, skill: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Experience (e.g. 2 years)"
          className="input"
          onChange={(e) =>
            setData({ ...data, experience: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Location (City / Area)"
          className="input"
          required
          onChange={(e) =>
            setData({ ...data, location: e.target.value })
          }
        />

        <textarea
          placeholder="Describe your work, availability, tools, etc."
          rows={4}
          className="input resize-none"
          onChange={(e) =>
            setData({ ...data, description: e.target.value })
          }
        />

        <button className="btn-primary">
          Submit Profile
        </button>
      </form>
    </main>
  );
}
