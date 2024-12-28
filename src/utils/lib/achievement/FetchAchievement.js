import { collection, getDocs } from "firebase/firestore";

import { db } from "@/utils/firebase";

export const fetchAchievement = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(db, process.env.NEXT_PUBLIC_API_ACHIEVEMENT),
      { next: { revalidate: 30 } }
    );
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    return [];
  }
};

export default fetchAchievement;
