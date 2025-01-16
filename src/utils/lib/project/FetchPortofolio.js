import { collection, getDocs, query, orderBy } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { cache } from "react";

export const fetchPortofolio = cache(async () => {
  try {
    const portofolioRef = collection(db, process.env.NEXT_PUBLIC_API_PROJECT);
    const portofolioQuery = query(portofolioRef, orderBy("title"));

    const querySnapshot = await getDocs(portofolioQuery);
    const data = querySnapshot.docs.map((doc) => {
      const docData = doc.data();

      const createdAt = docData.createdAt ? docData.createdAt.seconds : null;
      const date = docData.date ? docData.date.seconds : null;

      return {
        id: doc.id,
        ...docData,
        createdAt,
        date,
      };
    });

    return data;
  } catch (error) {
    console.error("Error fetching portofolio:", error);
    return [];
  }
});
