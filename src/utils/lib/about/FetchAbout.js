import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/firebase";

export const subscribeToAbout = (callback) => {
  const aboutRef = collection(db, process.env.NEXT_PUBLIC_API_ABOUT);
  const aboutQuery = query(aboutRef, orderBy("title"));

  // Mengembalikan fungsi unsubscribe
  return onSnapshot(aboutQuery, (querySnapshot) => {
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
