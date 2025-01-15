import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/firebase";

export const fetchVideos = async (callback) => {
  try {
    // Create query
    const q = query(collection(db, process.env.NEXT_PUBLIC_API_VIDEOS));

    // Set up real-time listener
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const videoData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(videoData);
    });

    // Return unsubscribe function
    return unsubscribe;
  } catch (error) {
    console.error("Error fetching videos:", error);
    callback([]);
    // Return a no-op function in case of error
    return () => {};
  }
};

export const fetchIcons = async (callback) => {
  try {
    const q = query(collection(db, process.env.NEXT_PUBLIC_API_ICONS));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const iconsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        image: doc.data().url,
        name: doc.id.substring(0, 8),
      }));
      callback(iconsData);
    });
    return unsubscribe;
  } catch (error) {
    console.error("Error fetching icons:", error);
    callback([]);
    return () => {};
  }
};

export const fetchCategories = async (callback) => {
  try {
    const q = query(
      collection(db, process.env.NEXT_PUBLIC_API_CATEGORY_VIDEOS)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const categoriesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(categoriesData);
    });
    return unsubscribe;
  } catch (error) {
    console.error("Error fetching categories:", error);
    callback([]);
    return () => {};
  }
};
