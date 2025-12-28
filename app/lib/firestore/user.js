import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const createUser = async (uid, data) => {
  await setDoc(doc(db, "users", uid), data);
};

export const getUser = async (uid) => {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
};
