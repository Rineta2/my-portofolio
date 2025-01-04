import { collection, getDocs, query, orderBy } from "firebase/firestore";

import { db } from "@/utils/firebase";

export const fetchSkills = async () => {
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
    return [];
  }
};
