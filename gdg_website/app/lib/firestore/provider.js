import { db } from "../firebase";
import { doc, setDoc, getDoc, getDocs, collection } from "firebase/firestore";

export const createProvider = async (uid, data) => {
  await setDoc(doc(db, "providers", uid), data);
};

export const getProvider = async (uid) => {
  const snap = await getDoc(doc(db, "providers", uid));
  return snap.exists() ? snap.data() : null;
};

export const getAllProviders = async () => {
  const snap = await getDocs(collection(db, "providers"));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};
