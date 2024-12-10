import { useState, useEffect, useCallback } from "react";
import { db } from "@/utils/firebase";
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import imagekit from "@/utils/imagekit";
import toast from "react-hot-toast";

export const useAboutForm = (id, router) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    description2: "",
  });
  const [image, setImage] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const fetchAboutItem = useCallback(async () => {
    try {
      const docRef = doc(db, process.env.NEXT_PUBLIC_API_ABOUT, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFormData({
          title: data.title,
          description: data.description,
          description2: data.description2 || "",
        });
        setCurrentImageUrl(data.imageUrl);
      }
    } catch (error) {
      toast.error("Error fetching data");
      console.error("Error fetching document:", error);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchAboutItem();
    }
  }, [id, fetchAboutItem]);

  const uploadImage = async (file) => {
    try {
      const response = await imagekit.upload({
        file: file,
        fileName: `about/${file.name}`,
        folder: "/about",
      });
      return response.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let imageUrl = currentImageUrl;
      if (image) {
        imageUrl = await uploadImage(image);
        if (!imageUrl) {
          toast.error("Failed to upload image");
          setIsLoading(false);
          return;
        }
      }

      const aboutData = {
        ...formData,
        imageUrl,
      };

      if (id) {
        await updateDoc(
          doc(db, process.env.NEXT_PUBLIC_API_ABOUT, id),
          aboutData
        );
        toast.success("About section updated successfully");
      } else {
        await addDoc(
          collection(db, process.env.NEXT_PUBLIC_API_ABOUT),
          aboutData
        );
        toast.success("About section added successfully");
      }

      setTimeout(() => {
        router.push("/admins/dashboard/about");
      }, 2000);
    } catch (error) {
      console.error("Error adding/updating document:", error);
      toast.error("Failed to save changes");
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  return {
    formData,
    isLoading,
    handleSubmit,
    handleInputChange,
    handleImageChange,
    previewUrl,
    currentImageUrl,
  };
};
