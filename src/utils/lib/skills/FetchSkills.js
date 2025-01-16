import { collection, getDocs, query, orderBy } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { cache } from "react";

export const fetchSkills = cache(async () => {
  try {
    const skillsRef = collection(db, process.env.NEXT_PUBLIC_API_SKILLS);
    const skillsQuery = query(skillsRef, orderBy("title"));

    const querySnapshot = await getDocs(skillsQuery);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data;
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
});
