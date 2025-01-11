import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/utils/firebase";

export const deleteSkill = async (id) => {
  try {
    await deleteDoc(doc(db, process.env.NEXT_PUBLIC_API_SKILLS, id));
    return true;
  } catch (error) {
    console.error("Error deleting skill:", error);
    return false;
  }
};
