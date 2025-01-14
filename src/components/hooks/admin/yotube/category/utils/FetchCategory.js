import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/firebase";

export const fetchCategory = (callback) => {
  try {
    // Create query
    const q = query(
      collection(db, process.env.NEXT_PUBLIC_API_CATEGORY_VIDEOS)
    );

    // Set up real-time listener
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const categoryData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(categoryData);
    });

    // Return unsubscribe function
    return unsubscribe;
  } catch (error) {
    console.error("Error fetching categories:", error);
    callback([]);
  }
};
