import { useState, useEffect } from "react";
import { useAuth } from "@/utils/auth/AuthContext";
import {
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "@/utils/firebase";
import { toast } from "react-hot-toast";

export function useLogin(onClose) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadSavedCredentials = () => {
      const savedEmail = localStorage.getItem("savedEmail");
      const savedPassword = localStorage.getItem("savedPassword");
      if (savedEmail && savedPassword) {
        setFormData({
          email: savedEmail,
          password: savedPassword,
          rememberMe: true,
        });
      }
    };
    loadSavedCredentials();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCredentials = (remember) => {
    const { email, password } = formData;
    if (remember) {
      localStorage.setItem("savedEmail", email);
      localStorage.setItem("savedPassword", password);
    } else {
      localStorage.removeItem("savedEmail");
      localStorage.removeItem("savedPassword");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      if (result) {
        handleCredentials(formData.rememberMe);
        await setPersistence(
          auth,
          formData.rememberMe
            ? browserLocalPersistence
            : browserSessionPersistence
        );
        onClose();
      }
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        toast.error("Email atau password salah");
      } else if (error.code === "auth/user-not-found") {
        toast.error("Email tidak terdaftar");
      } else if (error.code === "auth/too-many-requests") {
        toast.error("Terlalu banyak percobaan login. Silakan coba lagi nanti");
      } else {
        toast.error("Terjadi kesalahan. Silakan coba lagi");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    handleChange,
    handleSubmit,
  };
}
