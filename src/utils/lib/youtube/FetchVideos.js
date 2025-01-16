import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/firebase";

export const subscribeToVideos = (callback) => {
  const youtubeRef = collection(db, process.env.NEXT_PUBLIC_API_VIDEOS);
  const youtubeQuery = query(youtubeRef, orderBy("title"));

  // Mengembalikan fungsi unsubscribe
  return onSnapshot(youtubeQuery, (querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => {
      const docData = doc.data();

      const createdAt = docData.createdAt ? docData.createdAt.seconds : null;
      const date = docData.date ? docData.date.seconds : null;

      return {
        id: doc.id,
        ...docData,
        createdAt,
        date,
      };
    });

    callback(data);
  });
};
