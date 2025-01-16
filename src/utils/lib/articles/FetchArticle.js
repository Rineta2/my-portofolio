import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/firebase";

export const subscribeToArticles = (callback) => {
  const articlesRef = collection(db, process.env.NEXT_PUBLIC_API_ARTICLE);
  const articlesQuery = query(articlesRef, orderBy("title"));

  // Mengembalikan fungsi unsubscribe
  return onSnapshot(articlesQuery, (querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => {
      const docData = doc.data();

      const createdAt = docData.createdAt ? docData.createdAt.seconds : null;

      return {
        id: doc.id,
        ...docData,
        createdAt,
      };
    });

    callback(data);
  });
};
