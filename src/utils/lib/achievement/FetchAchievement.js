import { collection, getDocs, query, orderBy } from "firebase/firestore";

import { db } from "@/utils/firebase";

export const fetchAchievement = async () => {
  try {
    const achievementRef = collection(
      db,
      process.env.NEXT_PUBLIC_API_ACHIEVEMENT
    );

    const achievementQuery = query(achievementRef, orderBy("date"));

    const querySnapshot = await getDocs(achievementQuery);

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    return [];
  }
};
