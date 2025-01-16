import { collection, getDocs, query, orderBy } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { cache } from "react";

export const fetchAbout = cache(async () => {
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
    console.error("Error fetching about:", error);
    return [];
  }
});
