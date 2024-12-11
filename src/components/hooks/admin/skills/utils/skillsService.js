import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/utils/firebase";

export const fetchSkills = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(db, process.env.NEXT_PUBLIC_API_SKILLS)
    );
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
};

export const deleteSkill = async (id) => {
  try {
    await deleteDoc(doc(db, process.env.NEXT_PUBLIC_API_SKILLS, id));
    return true;
  } catch (error) {
    console.error("Error deleting skill:", error);
    return false;
  }
};
