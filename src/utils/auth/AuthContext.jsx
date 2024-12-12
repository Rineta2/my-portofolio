"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { auth, db } from "@/utils/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isInitialMount = useRef(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.emailVerified) {
        const userDoc = await getDoc(doc(db, process.env.NEXT_PUBLIC_API_USER, user.uid));

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const isNewRegistration = Cookies.get('isNewRegistration');

          setUser({
            ...user,
            ...userData,
            displayName: userData.firstName + ' ' + userData.lastName,
            isAdmin: userData.role === process.env.NEXT_PUBLIC_ROLE_ADMINS,
            role: userData.role,
          });

          if (isNewRegistration) {
            toast.success('Selamat datang di aplikasi kami!');
            Cookies.remove('isNewRegistration');
          } else if (!isInitialMount.current) {
            toast.success(`Selamat datang kembali, ${userData.firstName}!`);
          }

          Cookies.set('lastLoginTime', new Date().toISOString(), {
            expires: 7,
            secure: true,
            sameSite: "Strict"
          });
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

    isInitialMount.current = false;
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      console.error("Login error:", error);
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
      toast.success('Berhasil logout!');
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error('Gagal logout. Silakan coba lagi.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
