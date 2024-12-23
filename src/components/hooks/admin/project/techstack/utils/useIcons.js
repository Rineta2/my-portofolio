import { useState, useEffect } from "react";
import { db } from "@/utils/firebase";
import imagekit from "@/utils/imagekit";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import toast from "react-hot-toast";

export const useIcons = () => {
  const [icons, setIcons] = useState([]);

  const fetchIcons = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, process.env.NEXT_PUBLIC_API_ICONS)
      );
      const iconsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setIcons(iconsList);
    } catch (error) {
      toast.error("Gagal mengambil data icons");
    }
  };

  const addIcon = async (iconFile) => {
    const loadingToast = toast.loading("Menambahkan icon...");
    try {
      // Upload ke ImageKit
      const uploadResponse = await imagekit.upload({
        file: iconFile,
        fileName: `${Date.now()}_${iconFile.name}`,
        folder: "/icons",
      });

      // Simpan hanya URL ke Firestore
      await addDoc(collection(db, process.env.NEXT_PUBLIC_API_ICONS), {
        url: uploadResponse.url,
      });

      await fetchIcons();
      toast.success("Icon berhasil ditambahkan!", {
        id: loadingToast,
      });
      return true;
    } catch (error) {
      toast.error("Gagal menambahkan icon", {
        id: loadingToast,
      });
      return false;
    }
  };

  const deleteIcon = async (id) => {
    const loadingToast = toast.loading("Menghapus icon...");
    try {
      // Hapus dari Firestore
      await deleteDoc(doc(db, process.env.NEXT_PUBLIC_API_ICONS, id));
      await fetchIcons();
      toast.success("Icon berhasil dihapus!", {
        id: loadingToast,
      });
    } catch (error) {
      toast.error("Gagal menghapus icon", {
        id: loadingToast,
      });
    }
  };

  useEffect(() => {
    fetchIcons();
  }, []);

  return { icons, addIcon, deleteIcon };
};
