import { collection, getDocs, query, orderBy } from "firebase/firestore";

import { db } from "@/utils/firebase";

export const fetchAbout = async () => {
  try {
    const aboutRef = collection(db, process.env.NEXT_PUBLIC_API_ABOUT);

    const aboutQuery = query(aboutRef, orderBy("title"));

    const querySnapshot = await getDocs(aboutQuery);

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    return [];
  }
};
