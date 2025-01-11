"use server";

import { collection, getDocs, query, orderBy } from "firebase/firestore";

import { db } from "@/utils/firebase";

export const fetchComments = async () => {
  try {
    const commentsRef = collection(db, process.env.NEXT_PUBLIC_API_COMMENTS);
    const commentsQuery = query(commentsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(commentsQuery);

    const data = querySnapshot.docs.map((doc) => {
      const docData = doc.data();
      return {
        id: doc.id,
        ...docData,
        createdAt: docData.createdAt ? docData.createdAt.toMillis() : null,
      };
    });

    return data;
  } catch (error) {
    return [];
  }
};
