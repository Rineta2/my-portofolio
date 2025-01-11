"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { auth, db } from "@/utils/firebase";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { doc, getDoc } from "firebase/firestore";

import { useRouter } from "next/navigation";

import Cookies from "js-cookie";

import toast from "react-hot-toast";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const clearAuthData = () => {
    setUser(null);
    Cookies.remove("authToken");
    Cookies.remove("lastLoginTime");
    Cookies.remove("userRole");
  };

  const setCookies = (user, userData) => {
    const cookieOptions = {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    };
    Cookies.set("authToken", user.accessToken, cookieOptions);
    Cookies.set("lastLoginTime", new Date().toISOString(), cookieOptions);
    Cookies.set("userRole", userData.role, cookieOptions);
  };

  useEffect(() => {
    const handleUserData = async (user, userDoc) => {
      const userData = userDoc.data();
      const displayName = userData.displayName || "User";

      if (userData.accountStatus === "disabled") {
        await signOut(auth);
        clearAuthData();
        toast.error("Akun Anda telah dinonaktifkan. Silakan hubungi admin.");
        return null;
      }

      const updatedUser = {
        ...user,
        ...userData,
        displayName,
        isAdmin: userData.role === process.env.NEXT_PUBLIC_ROLE_ADMINS,
        isAuthor: userData.role === process.env.NEXT_PUBLIC_ROLE_AUTHORS,
        role: userData.role,
      };

      setUser(updatedUser);
      setCookies(user, userData);
      handleWelcomeMessages(userData, displayName);
      return updatedUser;
    };

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const userDoc = await getDoc(
            doc(db, process.env.NEXT_PUBLIC_API_USER, user.uid)
          );

          if (userDoc.exists()) {
            await handleUserData(user, userDoc);
          } else {
            clearAuthData();
          }
        } else {
          clearAuthData();
        }
      } catch (error) {
        clearAuthData();
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleWelcomeMessages = (userData, displayName) => {
    const isNewRegistration = Cookies.get("isNewRegistration");
    const lastLoginDate = localStorage.getItem("lastLoginDate");
    const today = new Date().toDateString();

    if (isNewRegistration) {
      toast.success("Selamat datang di aplikasi kami!");
      Cookies.remove("isNewRegistration");
    } else if (userData.role === process.env.NEXT_PUBLIC_ROLE_AUTHORS) {
      toast.success(`Selamat datang, Author ${displayName}!`);
    } else if (!lastLoginDate || lastLoginDate !== today) {
      toast.success(`Selamat datang kembali, ${displayName}!`);
    }

    localStorage.setItem("lastLoginDate", today);
  };

  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(
        doc(db, process.env.NEXT_PUBLIC_API_USER, result.user.uid)
      );

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (
          userData.accountStatus === "disabled" ||
          (userData.role !== "authors" && !result.user.emailVerified)
        ) {
          await signOut(auth);
          return null;
        }
      }

      localStorage.removeItem("lastLoginDate");
      return result;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      clearAuthData();
      toast.success("Berhasil logout!");
      router.push("/");
    } catch (error) {
      toast.error("Gagal logout. Silakan coba lagi.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
