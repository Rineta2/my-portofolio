import { useState } from "react";

import { toast } from "react-hot-toast";

import { format } from "date-fns";

import { db } from "@/utils/firebase";

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import imageCompression from "browser-image-compression";

import imagekit from "@/utils/imagekit";

export function useYoutubeManagement(videos, categories) {
  const [newVideo, setNewVideo] = useState({
    date: format(new Date(), "yyyy-MM-dd"),
    title: "",
    url: "",
    category: "",
    icons: [],
    thumbnail: "",
  });
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [itemsPerPage] = useState(5);
  const [pageNumber, setPageNumber] = useState(0);

  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(
    videos.filter((video) =>
      video.title.toLowerCase().includes(search.toLowerCase())
    ).length / itemsPerPage
  );

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleImageUpload = async (file) => {
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);

      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);

      reader.onloadend = async () => {
        const base64data = reader.result.split(",")[1];

        const uploadResponse = await imagekit.upload({
          file: base64data,
          fileName: `thumbnail-${Date.now()}`,
          folder: "/youtube-thumbnails",
        });

        setNewVideo((prev) => ({
          ...prev,
          thumbnail: uploadResponse.url,
        }));

        toast.success("Thumbnail uploaded successfully!");
      };
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload thumbnail");
    }
  };

  const handleAdd = async () => {
    try {
      const selectedCategory = categories.find(
        (cat) => cat.id === newVideo.category
      );
      const videosRef = collection(db, process.env.NEXT_PUBLIC_API_VIDEOS);
      await addDoc(videosRef, {
        ...newVideo,
        category: selectedCategory?.name || "",
        date: new Date(newVideo.date),
        createdAt: new Date(),
      });
      toast.success("Video added successfully!");
      setNewVideo({
        date: format(new Date(), "yyyy-MM-dd"),
        title: "",
        url: "",
        category: "",
        icons: [],
        thumbnail: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Failed to add video");
    }
  };

  const handleUpdate = async () => {
    try {
      const selectedCategory = categories.find(
        (cat) => cat.id === newVideo.category
      );
      const videoRef = doc(db, process.env.NEXT_PUBLIC_API_VIDEOS, editId);
      await updateDoc(videoRef, {
        ...newVideo,
        category: selectedCategory?.name || "",
      });
      toast.success("Video updated successfully!");
      setIsEditing(false);
      setEditId(null);
      setNewVideo({
        title: "",
        url: "",
        date: format(new Date(), "yyyy-MM-dd"),
        category: "",
        icons: [],
        thumbnail: "",
      });
    } catch (error) {
      console.error("Error updating document: ", error);
      toast.error("Failed to update video");
    }
  };

  const handleDelete = async (id) => {
    try {
      const videoRef = doc(db, process.env.NEXT_PUBLIC_API_VIDEOS, id);
      await deleteDoc(videoRef);
      toast.success("Video deleted successfully!");
    } catch (error) {
      console.error("Error deleting document: ", error);
      toast.error("Failed to delete video");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await handleUpdate();
    } else {
      await handleAdd();
    }
    setShowModal(false);
  };

  const openModal = (video = null) => {
    if (video) {
      setIsEditing(true);
      setEditId(video.id);
      const videoDate =
        video.date instanceof Date
          ? video.date
          : video.date?.toDate?.() || new Date(video.date) || new Date();

      const categoryId =
        categories.find((cat) => cat.name === video.category)?.id || "";

      setNewVideo({
        title: video.title,
        url: video.url,
        date: format(videoDate, "yyyy-MM-dd"),
        category: categoryId,
        icons: video.icons || [],
        thumbnail: video.thumbnail || "",
      });
    } else {
      setIsEditing(false);
      setNewVideo({
        title: "",
        url: "",
        date: format(new Date(), "yyyy-MM-dd"),
        category: "",
        icons: [],
        thumbnail: "",
      });
    }
    setShowModal(true);
  };

  return {
    newVideo,
    search,
    isEditing,
    showModal,
    itemsPerPage,
    pageNumber,
    pageCount,
    pagesVisited,
    setNewVideo,
    setSearch,
    handleSubmit,
    handleDelete,
    openModal,
    setShowModal,
    handlePageChange,
    handleImageUpload,
  };
}
