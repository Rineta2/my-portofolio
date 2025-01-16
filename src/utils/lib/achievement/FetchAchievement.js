import { collection, getDocs, query, orderBy } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { cache } from "react";

export const fetchAchievement = cache(async () => {
  try {
    const achievementRef = collection(
      db,
      process.env.NEXT_PUBLIC_API_ACHIEVEMENT
    );
    const achievementQuery = query(achievementRef, orderBy("date"));

    const querySnapshot = await getDocs(achievementQuery);
    const data = querySnapshot.docs.map((doc) => {
      const docData = doc.data();

      const date = docData.date ? docData.date.seconds : null;

      return {
        id: doc.id,
        ...docData,
        date,
      };
    });

    return data;
  } catch (error) {
    console.error("Error fetching achievement:", error);
    return [];
  }
});
