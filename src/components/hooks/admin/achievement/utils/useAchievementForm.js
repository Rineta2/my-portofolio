import { useState, useCallback } from "react";
import { db } from "@/utils/firebase";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import imagekit from "@/utils/imagekit";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createWorker } from "tesseract.js";

// Konstanta untuk kata kunci pencarian
const TITLE_KEYWORDS = [
  "english proficiency test",
  "certificate",
  "certification",
  "sertifikat",
  "sertifikasi",
  "tema",
];

export const useAchievementForm = (initialImageUrl = "") => {
  const router = useRouter();
  const [formData, setFormData] = useState({ title: "" });
  const [image, setImage] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(initialImageUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(initialImageUrl);

  const uploadImage = async (file) => {
    try {
      const response = await imagekit.upload({
        file,
        fileName: `achievement/${file.name}`,
        folder: "/achievement",
      });
      setCurrentImageUrl(response.url);
      return response.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const cleanTitle = (text) => {
    return text
      .replace(/has participated in/gi, "")
      .replace(/tema/gi, "")
      .replace(/[^\w\s-]/g, "")
      .trim();
  };

  const extractTextFromImage = async (file) => {
    try {
      const worker = await createWorker("eng");

      const getImageData = () =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

      const imageData = await getImageData();
      const {
        data: { text },
      } = await worker.recognize(imageData);
      await worker.terminate();

      const lines = text.split("\n").map((line) => line.trim());

      // Cari judul berdasarkan kata kunci
      const certificateTitle = lines.find((line) =>
        TITLE_KEYWORDS.some((keyword) => line.toLowerCase().includes(keyword))
      );

      if (certificateTitle) {
        return cleanTitle(certificateTitle);
      }

      // Fallback: gunakan baris terpanjang dari 5 baris pertama
      return lines
        .slice(0, 5)
        .reduce((a, b) => (a.length > b.length ? a : b))
        .trim();
    } catch (error) {
      console.error("Error in extractTextFromImage:", error);
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = currentImageUrl;
      if (image) {
        imageUrl = await uploadImage(image);
        if (!imageUrl) throw new Error("Failed to upload image");
      }

      await addDoc(collection(db, process.env.NEXT_PUBLIC_API_ACHIEVEMENT), {
        ...formData,
        imageUrl,
      });

      toast.success("Achievement added successfully");
      setTimeout(() => router.push("/admins/dashboard/achievement"), 2000);
    } catch (error) {
      console.error("Error adding document:", error);
      toast.error("Failed to save changes");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setPreviewUrl(null);
      setCurrentImageUrl("");
      setImage(null);
      return;
    }

    setImage(file);
    setIsLoading(true);

    try {
      const extractedTitle = await extractTextFromImage(file);
      if (extractedTitle) {
        setFormData((prev) => ({ ...prev, title: extractedTitle }));
      }

      // Set preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setCurrentImageUrl("");
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("Failed to extract text from image");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ title: "" });
    setImage(null);
    setCurrentImageUrl("");
    setPreviewUrl(null);
  };

  const fetchAchievement = useCallback(async (id) => {
    setIsLoading(true);
    try {
      const docRef = doc(db, process.env.NEXT_PUBLIC_API_ACHIEVEMENT, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setFormData({ title: data.title });
        setCurrentImageUrl(data.imageUrl);
        setPreviewUrl(data.imageUrl);
      }
    } catch (error) {
      console.error("Error fetching achievement:", error);
      toast.error("Failed to fetch achievement");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    formData,
    isLoading,
    handleSubmit,
    handleInputChange,
    handleImageChange,
    previewUrl,
    currentImageUrl,
    resetForm,
    fetchAchievement,
  };
};
