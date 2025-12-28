"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "./useAuth";
import { db } from "./../lib/firebase";

export function useRedirectIfAuthWithRole() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function redirect() {
      if (!loading && user) {
        const snap = await getDoc(doc(db, "users", user.uid));
        const role = snap.data()?.role;

        router.replace(
          role === "provider"
            ? "/provider/dashboard"
            : "/user/dashboard"
        );
      }
    }

    redirect();
  }, [user, loading, router]);
}
