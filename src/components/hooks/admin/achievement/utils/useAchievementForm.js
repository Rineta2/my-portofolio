import { useState, useCallback } from "react";
import { db } from "@/utils/firebase";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import imagekit from "@/utils/imagekit";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createWorker } from "tesseract.js";
import imageCompression from 'browser-image-compression';

// Konstanta untuk kata kunci pencarian
const TITLE_KEYWORDS = [
  "english proficiency test",
  "certificate",
  "certification",
  "sertifikat",
  "sertifikasi",
  "tema",
  "titled"
];

export const useAchievementForm = (initialImageUrl = "") => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    createdAt: new Date().toISOString()
  });
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(initialImageUrl);

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 1, // maksimum 1MB
      maxWidthOrHeight: 1024, // maksimum dimensi 1024px
      useWebWorker: true
    };

    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error("Error compressing image:", error);
      return file; // fallback ke file asli jika kompresi gagal
    }
  };

  const uploadImage = async (file) => {
    try {
      const compressedFile = await compressImage(file);
      const response = await imagekit.upload({
        file: compressedFile,
        fileName: `achievement/${file.name}`,
        folder: "/achievement",
      });
      return response.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error; // Lebih baik throw error untuk handling di handleSubmit
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
      let imageUrl = previewUrl;
      if (image) {
        imageUrl = await uploadImage(image);
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

  const handleInputChange = useCallback(({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setPreviewUrl(null);
      setImage(null);
      return;
    }

    setImage(file);
    setIsLoading(true);

    try {
      const compressedFile = await compressImage(file);
      const extractedTitle = await extractTextFromImage(compressedFile);
      if (extractedTitle) {
        setFormData((prev) => ({ ...prev, title: extractedTitle }));
      }

      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("Failed to process image");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ title: "", createdAt: new Date().toISOString() });
    setImage(null);
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
    resetForm,
    fetchAchievement,
  };
};
