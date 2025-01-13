import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "@/utils/firebase";

export const fetchContact = async () => {
  try {
    const contactRef = collection(db, process.env.NEXT_PUBLIC_API_CONTACT);

    const contactQuery = query(contactRef, orderBy("createdAt", "desc"));

    const querySnapshot = await getDocs(contactQuery);

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    return [];
  }
};

export const deleteContact = async (contactId) => {
  try {
    const contactRef = doc(db, process.env.NEXT_PUBLIC_API_CONTACT, contactId);
    await deleteDoc(contactRef);
    return { success: true };
  } catch (error) {
    console.error("Error deleting document:", error);
    return { success: false, error };
  }
};
