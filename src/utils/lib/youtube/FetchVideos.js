import { collection, getDocs, query, orderBy } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { cache } from "react";

export const fetchVideos = cache(async () => {
  try {
    const youtubeRef = collection(db, process.env.NEXT_PUBLIC_API_VIDEOS);
    const youtubeQuery = query(youtubeRef, orderBy("title"));

    const querySnapshot = await getDocs(youtubeQuery);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data;
  } catch (error) {
    return [];
  }
});
