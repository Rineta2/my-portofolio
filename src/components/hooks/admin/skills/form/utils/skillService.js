import { db } from "@/utils/firebase";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";

export async function fetchSkillById(id) {
  try {
    const skillDoc = await getDoc(
      doc(db, process.env.NEXT_PUBLIC_API_SKILLS, id)
    );
    if (skillDoc.exists()) {
      return skillDoc.data();
    }
    return null;
  } catch (error) {
    console.error("Error fetching skill:", error);
    throw error;
  }
}

export async function saveSkill(id, formData) {
  try {
    if (id) {
      return await updateDoc(
        doc(db, process.env.NEXT_PUBLIC_API_SKILLS, id),
        formData
      );
    } else {
      return await addDoc(
        collection(db, process.env.NEXT_PUBLIC_API_SKILLS),
        formData
      );
    }
  } catch (error) {
    console.error("Error saving skill:", error);
    throw error;
  }
}
