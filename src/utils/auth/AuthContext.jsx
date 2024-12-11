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

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.emailVerified) {
        const userDoc = await getDoc(
          doc(db, process.env.NEXT_PUBLIC_API_USER, user.uid)
        );

        if (userDoc.exists()) {
          const { role } = userDoc.data();
          setUser({
            ...user,
            isAdmin: role === process.env.NEXT_PUBLIC_ROLE_ADMINS,
            role,
          });
          localStorage.setItem("userRole", role);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
      if (user) {
        Cookies.set("authToken", user.accessToken, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Login error:", error);
      throw error; // Let the component handle the error
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      Cookies.remove("authToken");
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
