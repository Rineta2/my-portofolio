import { useState, useEffect } from "react";

import { db, auth } from "@/utils/firebase";

import { doc, updateDoc, getDoc } from "firebase/firestore";

import { updateProfile } from "firebase/auth";

import { toast } from "react-hot-toast";

import { handleImageUpload } from "@/components/hooks/admin/settings/utils/imageUtils";

export function useProfile() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    phoneNumber: "",
    photoURL: "",
    displayName: "",
    role: "",
    emailVerified: false,
    createdAt: "",
    updatedAt: "",
    uid: ""
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (auth.currentUser) {
      getUserData();
    }
  }, []);

  const getUserData = async () => {
    try {
      const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData({
          displayName: data.displayName || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          photoURL: data.photoURL || "",
          role: data.role || "",
          emailVerified: data.emailVerified || false,
          createdAt: data.createdAt || "",
          updatedAt: data.updatedAt || "",
          uid: data.uid || ""
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Gagal mengambil data user");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value || "",
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let updateData = { ...userData };

      if (file) {
        const photoURL = await handleImageUpload(file, auth.currentUser.uid);
        updateData.photoURL = photoURL;
      }

      updateData.updatedAt = new Date().toISOString();

      await updateDoc(doc(db, "users", auth.currentUser.uid), updateData);

      await updateProfile(auth.currentUser, {
        displayName: updateData.displayName,
        photoURL: updateData.photoURL
      });

      toast.success("Profil berhasil diperbarui");
      getUserData();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Gagal memperbarui profil: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    userData,
    loading,
    handleChange,
    handleFileChange,
    handleSubmit,
  };
}
