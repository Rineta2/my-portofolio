"use client";

import { useState, useEffect } from "react";

import toast from "react-hot-toast";

import {
  getIcons,
  createIcon,
  deleteIcon as deleteIconService,
} from "@/components/hooks/admin/project/techstack/utils/useFetchTech";

export const useIcons = () => {
  const [icons, setIcons] = useState([]);

  const fetchIcons = async () => {
    const result = await getIcons();
    if (result.success) {
      setIcons(result.data);
    } else {
      toast.error("Gagal mengambil data icons");
    }
  };

  const addIcon = async (iconFile) => {
    const loadingToast = toast.loading("Menambahkan icon...");
    const result = await createIcon(iconFile);

    if (result.success) {
      await fetchIcons();
      toast.success("Icon berhasil ditambahkan!", {
        id: loadingToast,
      });
      return true;
    } else {
      toast.error("Gagal menambahkan icon", {
        id: loadingToast,
      });
      return false;
    }
  };

  const deleteIcon = async (id) => {
    const loadingToast = toast.loading("Menghapus icon...");
    const result = await deleteIconService(id);

    if (result.success) {
      await fetchIcons();
      toast.success("Icon berhasil dihapus!", {
        id: loadingToast,
      });
    } else {
      toast.error("Gagal menghapus icon", {
        id: loadingToast,
      });
    }
  };

  useEffect(() => {
    fetchIcons();
  }, []);

  return {
    icons,
    addIcon,
    deleteIcon,
  };
};
