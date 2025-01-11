import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { toast } from "react-hot-toast";

export const fetchCategories = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(db, process.env.NEXT_PUBLIC_API_ARTICLE_CATEGORY)
    );
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const addCategory = async (newCategory) => {
  if (!newCategory.trim()) {
    toast.error("Please enter a category name");
    return false;
  }

  try {
    await addDoc(collection(db, process.env.NEXT_PUBLIC_API_ARTICLE_CATEGORY), {
      name: newCategory.trim(),
      createdAt: new Date().toISOString(),
    });
    toast.success("Category added successfully");
    return true;
  } catch (error) {
    console.error("Error adding category:", error);
    toast.error("Failed to add category");
    throw error;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    await deleteDoc(
      doc(db, process.env.NEXT_PUBLIC_API_ARTICLE_CATEGORY, categoryId)
    );
    toast.success("Category deleted successfully");
    return true;
  } catch (error) {
    console.error("Error deleting category:", error);
    toast.error("Failed to delete category");
    throw error;
  }
};

export const updateCategory = async (categoryId, newName) => {
  try {
    await updateDoc(
      doc(db, process.env.NEXT_PUBLIC_API_ARTICLE_CATEGORY, categoryId),
      {
        name: newName.trim(),
      }
    );
    toast.success("Category updated successfully");
    return true;
  } catch (error) {
    console.error("Error updating category:", error);
    toast.error("Failed to update category");
    throw error;
  }
};
