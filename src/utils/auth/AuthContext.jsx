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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const userDoc = await getDoc(
            doc(db, process.env.NEXT_PUBLIC_API_USER, user.uid)
          );

          if (userDoc.exists()) {
            const userData = userDoc.data();
            const isNewRegistration = Cookies.get("isNewRegistration");
            const lastLoginDate = localStorage.getItem("lastLoginDate");
            const today = new Date().toDateString();

            const displayName = userData.displayName || "User";

            const updatedUser = {
              ...user,
              ...userData,
              displayName,
              isAdmin: userData.role === process.env.NEXT_PUBLIC_ROLE_ADMINS,
              isAuthor: userData.role === process.env.NEXT_PUBLIC_ROLE_AUTHORS,
              role: userData.role,
            };

            setUser(updatedUser);

            const cookieOptions = {
              expires: 7,
              secure: true,
              sameSite: "Strict",
            };

            Cookies.set("authToken", user.accessToken, cookieOptions);
            Cookies.set(
              "lastLoginTime",
              new Date().toISOString(),
              cookieOptions
            );

            if (isNewRegistration) {
              toast.success("Selamat datang di aplikasi kami!");
              Cookies.remove("isNewRegistration");
            } else if (userData.role === process.env.NEXT_PUBLIC_ROLE_AUTHORS) {
              toast.success(`Selamat datang, Author ${displayName}!`);
            } else if (!lastLoginDate || lastLoginDate !== today) {
              toast.success(`Selamat datang kembali, ${displayName}!`);
            }

            localStorage.setItem("lastLoginDate", today);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth state change error:", error);
        toast.error("Terjadi kesalahan saat memuat data pengguna");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAuthError = (error) => {
    const errorMessages = {
      "auth/invalid-credential": "Email atau password salah",
      "auth/user-not-found": "Akun tidak ditemukan",
      "auth/wrong-password": "Password salah",
      "auth/too-many-requests":
        "Terlalu banyak percobaan login. Silakan coba lagi nanti",
    };

    toast.error(
      errorMessages[error.code] || "Terjadi kesalahan. Silakan coba lagi"
    );
  };

  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      // Get user role from Firestore
      const userDoc = await getDoc(
        doc(db, process.env.NEXT_PUBLIC_API_USER, result.user.uid)
      );

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("User Role:", userData.role); // Debug log

        // Jika role adalah authors, langsung return
        if (userData.role === "authors") {
          // Set user role in cookies
          Cookies.set("userRole", userData.role, {
            expires: 7,
            secure: true,
            sameSite: "Strict",
          });
          return result;
        }

        // Untuk role selain authors, cek verifikasi email
        if (!result.user.emailVerified) {
          await signOut(auth);
          toast.error("Silakan verifikasi email Anda terlebih dahulu");
          return null;
        }

        // Set user role in cookies
        Cookies.set("userRole", userData.role, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });
      }

      localStorage.removeItem("lastLoginDate");
      return result;
    } catch (error) {
      console.error("Login error:", error);
      handleAuthError(error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      Cookies.remove("authToken");
      Cookies.remove("lastLoginTime");
      Cookies.remove("userRole");
      toast.success("Berhasil logout!");
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
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
