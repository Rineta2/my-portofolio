import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

import { db } from "@/utils/firebase";

export const fetchArticles = async () => {
  try {
    const articlesRef = collection(db, process.env.NEXT_PUBLIC_API_ARTICLE);
    const articlesQuery = query(articlesRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(articlesQuery);

    const data = querySnapshot.docs.map((doc) => {
      const docData = doc.data();
      return {
        id: doc.id,
        ...docData,
        // Konversi Firestore Timestamp ke JavaScript Date
        createdAt:
          docData.createdAt?.toDate?.()?.toISOString() || docData.createdAt,
      };
    });
    return data;
  } catch (error) {
    console.error("Error fetching articles:", error);
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

export async function fetchRecentArticles(currentSlug) {
  try {
    const articlesRef = collection(db, process.env.NEXT_PUBLIC_API_ARTICLE);
    const articlesQuery = query(
      articlesRef,
      orderBy("createdAt", "desc"),
      limit(4)
    );
    const querySnapshot = await getDocs(articlesQuery);

    return querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((article) => article.slug !== currentSlug)
      .slice(0, 3);
  } catch (error) {
    console.error("Error fetching recent articles:", error);
    return [];
  }
}
