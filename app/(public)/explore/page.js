"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function ExplorePage() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProviders() {
      try {
        const snap = await getDocs(collection(db, "providers"));
        const list = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProviders(list);
      } catch (err) {
        console.error("Error fetching providers", err);
      }
      setLoading(false);
    }

    fetchProviders();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading providers...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black to-white px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-2">Explore Local Providers</h1>
          <p className="text-gray-200">
            Find skilled people near you and connect directly
          </p>
        </div>

        {/* Providers Grid */}
        {providers.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-700">
            No providers available yet.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {providers.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl shadow-lg p-6 space-y-4"
              >
                {/* Name */}
                <h2 className="text-2xl font-bold text-indigo-700">
                  {p.name || "Service Provider"}
                </h2>

                {/* Info */}
                <p className="text-gray-800">
                  <span className="font-semibold">Skill:</span>{" "}
                  {p.skill}
                </p>

                <p className="text-gray-800">
                  <span className="font-semibold">Experience:</span>{" "}
                  {p.experience || "Not specified"}
                </p>

                <p className="text-gray-800">
                  <span className="font-semibold">Location:</span>{" "}
                  {p.location}
                </p>

                {/* Description */}
                <p className="text-gray-600 text-sm">
                  {p.description || "No description provided."}
                </p>

                {/* Action */}
                <button
                  className="w-full bg-indigo-700 text-white py-2 rounded-full font-semibold hover:scale-105 transition"
                  onClick={() => alert("Contact feature coming soon")}
                >
                  Contact Provider
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
