"use server";

import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "@/utils/firebase";

export const fetchAchievement = async () => {
  try {
    const achievementRef = collection(
      db,
      process.env.NEXT_PUBLIC_API_ACHIEVEMENT
    );

    const achievementQuery = query(achievementRef, orderBy("title"));

    const querySnapshot = await getDocs(achievementQuery);

    const data = querySnapshot.docs.map((doc) => {
      const docData = doc.data();
      return {
        id: doc.id,
        ...docData,
        date: docData.date?.toMillis() || null,
      };
    });
    return data;
  } catch (error) {
    return [];
  }
};

export const handleDelete = async (id) => {
  try {
    await deleteDoc(doc(db, process.env.NEXT_PUBLIC_API_ACHIEVEMENT, id));
    return true;
  } catch (error) {
    return false;
  }
};
