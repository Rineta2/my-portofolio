import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/utils/firebase";

export const fetchTags = async (selectedCategory) => {
  try {
    let q = selectedCategory
      ? query(
          collection(db, process.env.NEXT_PUBLIC_API_ARTICLE_TAGS),
          where("categoryId", "==", selectedCategory)
        )
      : collection(db, process.env.NEXT_PUBLIC_API_ARTICLE_TAGS);

    const querySnapshot = await getDocs(q);
    const tagsData = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        categoryId: data.categoryId,
        createdAt: data.createdAt?.toDate?.()
          ? data.createdAt.toDate().toISOString()
          : data.createdAt,
      };
    });
    return tagsData;
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
};
