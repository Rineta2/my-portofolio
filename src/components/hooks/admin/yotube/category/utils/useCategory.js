import { db } from "@/utils/firebase";

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const useCategory = () => {
  const addCategory = async (categoryData) => {
    try {
      const docRef = await addDoc(
        collection(db, process.env.NEXT_PUBLIC_API_CATEGORY_VIDEOS),
        categoryData
      );
      return docRef.id;
    } catch (error) {
      console.error("Error adding category:", error);
      throw error;
    }
  };

  const updateCategory = async (id, categoryData) => {
    try {
      await updateDoc(
        doc(db, process.env.NEXT_PUBLIC_API_CATEGORY_VIDEOS, id),
        categoryData
      );
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  };

  const deleteCategory = async (id) => {
    try {
      await deleteDoc(doc(db, process.env.NEXT_PUBLIC_API_CATEGORY_VIDEOS, id));
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  };

  return {
    addCategory,
    updateCategory,
    deleteCategory,
  };
};
