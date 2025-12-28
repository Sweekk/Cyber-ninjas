"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { useAuth } from "../../hooks/useAuth";

export default function ProviderDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
      return;
    }

    async function fetchProvider() {
      if (user) {
        const snap = await getDoc(doc(db, "providers", user.uid));
        if (!snap.exists()) {
          router.replace("/provider/register");
        } else {
          setProvider(snap.data());
        }
      }
    }

    fetchProvider();
  }, [user, loading, router]);

  if (loading || !provider) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading dashboard...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black to-white px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="flex justify-between items-center text-white">
          <h1 className="text-3xl font-bold">
            Welcome, {user.displayName || "Provider"}
          </h1>
          <button
            onClick={() => signOut(auth)}
            className="bg-red-500 px-4 py-2 rounded-full font-semibold"
          >
            Logout
          </button>
        </div>

        {/* PROFILE */}
        <div className="bg-white rounded-2xl shadow-xl p-8 grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-bold text-indigo-700 mb-4">
              Your Profile
            </h2>
            <p><b>Skill:</b> {provider.skill}</p>
            <p><b>Experience:</b> {provider.experience || "Not specified"}</p>
            <p><b>Location:</b> {provider.location}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-indigo-700 mb-4">
              About You
            </h2>
            <p className="text-gray-700">
              {provider.description || "No description added"}
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">Edit Profile</h3>
            <p className="text-gray-600 mb-4">
              Update your skills or availability
            </p>
            <button className="w-full bg-indigo-700 text-white py-3 rounded-full font-semibold">
              Edit
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">Explore Jobs</h3>
            <p className="text-gray-600 mb-4">
              Discover job requests near you
            </p>
            <button
              onClick={() => router.push("/explore")}
              className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold"
            >
              Explore
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">Visibility</h3>
            <p className="text-gray-600 mb-4">
              Your profile is live
            </p>
            <span className="text-green-600 font-semibold">Active</span>
          </div>

        </div>
      </div>
    </main>
  );
}
