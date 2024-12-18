import { useState, useCallback } from "react";
import { db } from "@/utils/firebase";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import imagekit from "@/utils/imagekit";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createWorker } from "tesseract.js";
import imageCompression from 'browser-image-compression';
import { format, parse } from 'date-fns';

export const useAchievementForm = (id = null, initialImageUrl = "") => {
  const router = useRouter();
  const [formData, setFormData] = useState({ title: "", date: "" });
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(initialImageUrl);

  const compressImage = async (file) => {
    try {
      return await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true
      });
    } catch (error) {
      console.error("Compression failed:", error);
      return file;
    }
  };

  const extractTextFromImage = async (file) => {
    try {
      const worker = await createWorker("eng");
      const imageData = await file.arrayBuffer();
      const { data: { text } } = await worker.recognize(imageData);
      await worker.terminate();

      const lines = text.toLowerCase().split("\n");

      return lines.find(line =>
        line.includes("english proficiency test") ||
        line.includes("mgmp bahasa inggris")
      ) || lines[0] || "English Proficiency Test Bogor Regency";
    } catch (error) {
      console.error("Text extraction failed:", error);
      return "";
    }
  };

  const cleanTitle = (text) => {
    if (!text) return "";

    const removeWords = [
      "tema",
      "has participated in",
      "certificate of",
      "certification",
      "certificate",
      "sertifikat",
      "sertifikasi",
      "certified that"
    ];

    const removePattern = new RegExp(removeWords.join("|"), "gi");

    const cleanedText = text
      .replace(removePattern, "")
      .replace(/[^\w\s-]/g, " ")
      .trim()
      .replace(/\s+/g, " ");

    return cleanedText
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const imageUrl = image ? await uploadImage(image) : previewUrl;

      let achievementData = {
        title: formData.title,
        imageUrl,
      };

      if (formData.date) {
        achievementData.date = parse(formData.date, 'yyyy-MM-dd', new Date());
      }

      if (id) {
        console.log("Updating document with ID:", id);
        const docRef = doc(db, process.env.NEXT_PUBLIC_API_ACHIEVEMENT, id);
        await updateDoc(docRef, achievementData);
        toast.success("Achievement updated successfully");
      } else {
        console.log("Creating new document");
        await addDoc(collection(db, process.env.NEXT_PUBLIC_API_ACHIEVEMENT), achievementData);
        toast.success("Achievement added successfully");
      }

      router.push("/admins/dashboard/achievement");
    } catch (error) {
      console.error("Error saving achievement:", error);
      toast.error("Failed to save changes");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setIsLoading(true);

    try {
      const compressedFile = await compressImage(file);
      const extractedTitle = cleanTitle(await extractTextFromImage(compressedFile));
      setFormData(prev => ({ ...prev, title: extractedTitle }));

      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      toast.error("Failed to process image");
    } finally {
      setIsLoading(false);
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
      throw error;
    }
  };

  const fetchAchievement = useCallback(async (id) => {
    setIsLoading(true);
    try {
      const docRef = doc(db, process.env.NEXT_PUBLIC_API_ACHIEVEMENT, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const formattedDate = data.date ? format(data.date.toDate(), 'yyyy-MM-dd') : '';

        setFormData({
          title: data.title,
          date: formattedDate
        });
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
    handleInputChange: useCallback(({ target: { name, value } }) =>
      setFormData(prev => ({ ...prev, [name]: value })), []),
    handleImageChange,
    previewUrl,
    resetForm: () => {
      setFormData({ title: "", date: "" });
      setImage(null);
      setPreviewUrl(null);
    },
    fetchAchievement
  };
};
