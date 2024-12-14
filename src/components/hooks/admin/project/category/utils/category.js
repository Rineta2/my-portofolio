import { db } from "@/utils/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const COLLECTION_NAME = process.env.NEXT_PUBLIC_API_CATEGORY;

export const createCategory = async (categoryData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      name: categoryData.name,
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error creating category:", error);
    return { success: false, error: error.message };
  }
};

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

export const updateCategory = async (categoryId, updateData) => {
  try {
    const categoryRef = doc(db, COLLECTION_NAME, categoryId);
    await updateDoc(categoryRef, updateData);
    return { success: true };
  } catch (error) {
    console.error("Error updating category:", error);
    return { success: false, error: error.message };
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const categoryRef = doc(db, COLLECTION_NAME, categoryId);
    await deleteDoc(categoryRef);
    return { success: true };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, error: error.message };
  }
};
