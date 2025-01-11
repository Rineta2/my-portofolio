import { collection, getDocs, query, orderBy } from "firebase/firestore";

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
