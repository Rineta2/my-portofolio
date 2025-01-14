"use server";

import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/utils/firebase";

export const fetchVideos = async () => {
  try {
    const videosRef = collection(db, process.env.NEXT_PUBLIC_API_VIDEOS);
    const videosQuery = query(videosRef);

    const querySnapshot = await getDocs(videosQuery);

    const data = querySnapshot.docs.map((doc) => {
      const docData = doc.data();
      return {
        id: doc.id,
        title: docData.title,
        url: docData.url,
        date: docData.date
          ? docData.date.toDate().toISOString()
          : new Date().toISOString(),
      };
    });

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};
