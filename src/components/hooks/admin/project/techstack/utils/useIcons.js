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
      const querySnapshot = await getDocs(collection(db, "icons"));
      const iconsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setIcons(iconsList);
    } catch (error) {
      console.error("Error mengambil data icons:", error);
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
      await addDoc(collection(db, "icons"), {
        url: uploadResponse.url
      });

      await fetchIcons();
      toast.success("Icon berhasil ditambahkan!", {
        id: loadingToast,
      });
      return true;
    } catch (error) {
      console.error("Error menambah icon:", error);
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
      await deleteDoc(doc(db, "icons", id));
      await fetchIcons();
      toast.success("Icon berhasil dihapus!", {
        id: loadingToast,
      });
    } catch (error) {
      console.error("Error menghapus icon:", error);
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
