import { collection, getDocs, query, orderBy } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { cache } from "react";

export const fetchArticle = cache(async () => {
  try {
    const articleRef = collection(db, process.env.NEXT_PUBLIC_API_ARTICLE);
    const articleQuery = query(articleRef, orderBy("createdAt", "desc"));

    const querySnapshot = await getDocs(articleQuery);
    const data = querySnapshot.docs.map((doc) => {
      const docData = doc.data();

      const createdAt = docData.createdAt ? docData.createdAt.seconds : null;

      return {
        id: doc.id,
        ...docData,
        createdAt,
      };
    });

    return data;
  } catch (error) {
    console.error("Error fetching article:", error);
    return [];
  }
});
