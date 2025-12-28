"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useAuth } from "../../hooks/useAuth";

export default function UserDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
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
            Welcome, {user.displayName || "User"}
          </h1>
          <button
            onClick={() => signOut(auth)}
            className="bg-red-500 px-4 py-2 rounded-full font-semibold"
          >
            Logout
          </button>
        </div>

        {/* SEARCH */}
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-xl font-bold text-indigo-700 mb-4">
            Find Local Services
          </h2>
          <input
            placeholder="Search by skill (e.g. plumber, tutor)"
            className="w-full px-4 py-3 border rounded-lg"
          />
        </div>

        {/* ACTIONS */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg">Explore Providers</h3>
            <p className="text-gray-600 mb-4">
              Browse local service providers
            </p>
            <button
              onClick={() => router.push("/explore")}
              className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold"
            >
              Explore
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg">Saved Profiles</h3>
            <p className="text-gray-600 mb-4">
              Providers you saved
            </p>
            <button className="w-full bg-indigo-700 text-white py-3 rounded-full font-semibold">
              View Saved
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg">My Requests</h3>
            <p className="text-gray-600 mb-4">
              Providers you contacted
            </p>
            <button className="w-full bg-indigo-700 text-white py-3 rounded-full font-semibold">
              View Requests
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}
