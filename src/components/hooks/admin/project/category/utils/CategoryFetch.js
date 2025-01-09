import { db } from "@/utils/firebase";

import { collection, getDocs } from "firebase/firestore";

const COLLECTION_NAME = process.env.NEXT_PUBLIC_API_CATEGORY;

export const getCategories = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const categories = [];
    querySnapshot.forEach((doc) => {
      categories.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: categories };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { success: false, error: error.message };
  }
};
