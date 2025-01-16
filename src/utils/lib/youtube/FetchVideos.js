import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

import { db } from "@/utils/firebase";

export const fetchVideos = () => {
  return new Promise((resolve, reject) => {
    const youtubeRef = collection(db, process.env.NEXT_PUBLIC_API_VIDEOS);
    const youtubeQuery = query(youtubeRef, orderBy("title"));

    const unsubscribe = onSnapshot(
      youtubeQuery,
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          const docData = doc.data();
          const createdAt = docData.createdAt
            ? docData.createdAt.seconds
            : null;
          const date = docData.date ? docData.date.seconds : null;

          return {
            id: doc.id,
            ...docData,
            createdAt,
            date,
          };
        });
        resolve(data);
      },
      reject
    );
  });
};
