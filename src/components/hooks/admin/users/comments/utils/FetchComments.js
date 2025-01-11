"use server";

import { collection, getDocs, query, orderBy } from "firebase/firestore";

import { db } from "@/utils/firebase";

export const fetchComments = async () => {
  try {
    const commentsRef = collection(db, process.env.NEXT_PUBLIC_API_COMMENTS);
    const commentsQuery = query(commentsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(commentsQuery);

    const data = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const docData = doc.data();

        // Fetch replies for this comment
        const repliesRef = collection(
          db,
          process.env.NEXT_PUBLIC_API_COMMENTS,
          doc.id,
          "replies"
        );
        const repliesSnapshot = await getDocs(repliesRef);
        const replies = repliesSnapshot.docs.map((replyDoc) => ({
          id: replyDoc.id,
          ...replyDoc.data(),
          createdAt: replyDoc.data().createdAt
            ? replyDoc.data().createdAt.toMillis()
            : null,
        }));

        return {
          id: doc.id,
          ...docData,
          createdAt: docData.createdAt ? docData.createdAt.toMillis() : null,
          replies: replies,
        };
      })
    );

    return data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};
