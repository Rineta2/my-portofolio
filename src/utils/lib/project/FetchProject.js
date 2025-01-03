import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "@/utils/firebase";

export const fetchProjects = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(db, process.env.NEXT_PUBLIC_API_PROJECT),
      { next: { revalidate: 30 } }
    );
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    return [];
  }
};

export const fetchProjectBySlug = async (slug) => {
  try {
    const projectsRef = collection(db, process.env.NEXT_PUBLIC_API_PROJECT);
    const q = query(projectsRef, where("slug", "==", slug));
    const querySnapshot = await getDocs(q, { next: { revalidate: 30 } });

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    return null;
  }
};

export default fetchProjects;