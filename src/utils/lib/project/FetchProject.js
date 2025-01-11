import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { cache } from "react";

export const fetchProjects = cache(async () => {
  try {
    const projectsRef = collection(db, process.env.NEXT_PUBLIC_API_PROJECT);
    const projectsQuery = query(projectsRef, orderBy("createdAt", "desc"));

    const querySnapshot = await getDocs(projectsQuery);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data;
  } catch (error) {
    return [];
  }
});

export const fetchProjectBySlug = async (slug) => {
  try {
    const projectsRef = collection(db, process.env.NEXT_PUBLIC_API_PROJECT);
    const projectQuery = query(projectsRef, where("slug", "==", slug));

    const querySnapshot = await getDocs(projectQuery);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    };
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return null;
  }
};
