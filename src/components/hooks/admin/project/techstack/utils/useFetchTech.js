import { db } from "@/utils/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import imagekit from "@/utils/imagekit";

export const getIcons = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(db, process.env.NEXT_PUBLIC_API_ICONS)
    );
    const iconsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { success: true, data: iconsList };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const createIcon = async (iconFile) => {
  try {
    const uploadResponse = await imagekit.upload({
      file: iconFile,
      fileName: `${Date.now()}_${iconFile.name}`,
      folder: "/icons",
    });

    await addDoc(collection(db, process.env.NEXT_PUBLIC_API_ICONS), {
      url: uploadResponse.url,
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteIcon = async (id) => {
  try {
    await deleteDoc(doc(db, process.env.NEXT_PUBLIC_API_ICONS, id));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
