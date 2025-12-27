"use client";

import { createProvider } from "@/lib/firestore/providers";
import { uploadImage } from "@/lib/storage";
import { auth } from "@/lib/firebase";

const handleSubmit = async () => {
  const user = auth.currentUser;

  const photoURL = await uploadImage(photo, `providers/${user.uid}/photo.jpg`);

  await createProvider(user.uid, {
    name,
    occupation,
    skills,
    address,
    photoURL,
    createdAt: new Date(),
  });
};
