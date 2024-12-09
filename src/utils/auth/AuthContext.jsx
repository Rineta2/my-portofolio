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
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user.emailVerified) {
          const userDoc = await getDoc(
            doc(db, process.env.NEXT_PUBLIC_API_USER, user.uid)
          );

          if (userDoc.exists()) {
            const userData = userDoc.data();
            const role = userData.role;

            setUser({
              ...user,
              isAdmin: role === process.env.NEXT_PUBLIC_ROLE_ADMIN,
              role: role,
            });

            localStorage.setItem("userRole", role);

            if (!Cookies.get("authToken")) {
              const welcomeMessage =
                role === process.env.NEXT_PUBLIC_ROLE_ADMIN
                  ? `Selamat Datang Kembali, Admin ${userData.firstName}!`
                  : `Selamat Datang Kembali, ${userData.firstName}!`;

              toast.success(welcomeMessage, {
                duration: 3000,
                position: "top-center",
              });
            }

            Cookies.set("authToken", user.accessToken, {
              expires: 7,
              secure: true,
              sameSite: "Strict",
            });

            const refreshToken = await user.getIdToken();
            if (refreshToken) {
              Cookies.set("refreshToken", refreshToken, {
                expires: 30,
                secure: true,
                sameSite: "Strict",
              });
            }
          }
        } else {
          setUser(null);
          Cookies.remove("authToken");
          Cookies.remove("refreshToken");
        }
      } else {
        setUser(null);
        Cookies.remove("authToken");
        Cookies.remove("refreshToken");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      Cookies.remove("authToken");
      Cookies.remove("refreshToken");
      router.push("/");
      toast.success("Berhasil Logout!", {
        duration: 3000,
        position: "top-center",
      });
    } catch (error) {
      toast.error("Gagal Logout. Silakan coba lagi.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
