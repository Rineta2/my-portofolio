import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

import { db } from "@/utils/firebase";

export const fetchArticles = async () => {
  try {
    const articlesRef = collection(db, process.env.NEXT_PUBLIC_API_ARTICLE);

    const articlesQuery = query(articlesRef, orderBy("createdAt", "desc"));

    const querySnapshot = await getDocs(articlesQuery);

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    return [];
  }
};

export const fetchArticleBySlug = async (slug) => {
  try {
    const articlesRef = collection(db, process.env.NEXT_PUBLIC_API_ARTICLE);

    const articlesQuery = query(articlesRef, where("slug", "==", slug));

    const querySnapshot = await getDocs(articlesQuery);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    };
  } catch (error) {
    return null;
  }
};
