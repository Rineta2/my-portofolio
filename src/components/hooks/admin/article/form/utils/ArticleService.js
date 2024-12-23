import { db } from "@/utils/firebase";

import imagekit from "@/utils/imagekit";

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  where,
  getDoc,
} from "firebase/firestore";

const COLLECTION_NAME = process.env.NEXT_PUBLIC_API_ARTICLE;

export const articleService = {
  // Create article
  async createArticle(data, imageFile) {
    try {
      let imageUrl = "";
      if (imageFile) {
        const folderPath = data.folderName
          ? `/articles/${data.folderName}`
          : "/articles";

        const upload = await imagekit.upload({
          file: imageFile,
          fileName: `article-${Date.now()}`,
          folder: folderPath,
        });
        imageUrl = upload.url;
      }

      // Save to Firebase with the correct format
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...data,
        imageUrl,
        folderName: data.folderName || "",
        category: {
          id: data.category.id,
          name: data.category.name,
        },
        tags: data.tags.map((tag) => ({
          id: tag.id,
          name: tag.name,
        })),
        authorId: data.authorId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return docRef;
    } catch (error) {
      throw error;
    }
  },

  // Read articles
  async getArticles() {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      throw error;
    }
  },

  // Update article
  async updateArticle(id, data, imageFile) {
    try {
      let imageUrl = data.imageUrl;
      if (imageFile) {
        const folderPath = data.folderName
          ? `/articles/${data.folderName}`
          : "/articles";

        const upload = await imagekit.upload({
          file: imageFile,
          fileName: `article-${Date.now()}`,
          folder: folderPath,
        });
        imageUrl = upload.url;
      }

      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...data,
        imageUrl,
        folderName: data.folderName || "",
        category: {
          id: data.category.id,
          name: data.category.name,
        },
        tags: data.tags.map((tag) => ({
          id: tag.id,
          name: tag.name,
        })),
        authorId: data.authorId,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      throw error;
    }
  },

  // Delete article
  async deleteArticle(id) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      throw error;
    }
  },

  // Get categories
  async getCategories() {
    try {
      const querySnapshot = await getDocs(
        collection(db, process.env.NEXT_PUBLIC_API_ARTICLE_CATEGORY)
      );
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
    } catch (error) {
      throw error;
    }
  },

  // Get tags by category
  async getTagsByCategory(categoryId) {
    try {
      const q = query(
        collection(db, process.env.NEXT_PUBLIC_API_ARTICLE_TAGS),
        where("categoryId", "==", categoryId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      throw error;
    }
  },

  // Add new method to get admin users
  async getAdminUsers() {
    try {
      const q = query(
        collection(db, process.env.NEXT_PUBLIC_API_USERS),
        where("role", "==", process.env.NEXT_PUBLIC_ROLE_ADMINS)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        displayName: doc.data().displayName,
        firstName: doc.data().firstName,
        lastName: doc.data().lastName,
        role: doc.data().role,
        photoURL: doc.data().photoURL,
        email: doc.data().email,
      }));
    } catch (error) {
      throw error;
    }
  },

  // Get single article
  async getArticle(id) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
        };
      } else {
        throw new Error("Article not found");
      }
    } catch (error) {
      throw error;
    }
  },
};
