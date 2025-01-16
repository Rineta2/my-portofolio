import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/firebase";

export const subscribeToPortofolio = (callback) => {
  const portofolioRef = collection(db, process.env.NEXT_PUBLIC_API_PROJECT);
  const portofolioQuery = query(portofolioRef, orderBy("createdAt", "desc"));

  // Mengembalikan fungsi unsubscribe
  return onSnapshot(portofolioQuery, (querySnapshot) => {
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
