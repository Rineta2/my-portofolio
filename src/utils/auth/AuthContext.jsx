"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
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
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user?.emailVerified) {
          const userDoc = await getDoc(doc(db, process.env.NEXT_PUBLIC_API_USER, user.uid));

          if (userDoc.exists()) {
            const userData = userDoc.data();
            const isNewRegistration = Cookies.get('isNewRegistration');
            const lastLoginDate = localStorage.getItem('lastLoginDate');
            const today = new Date().toDateString();

            const updatedUser = {
              ...user,
              ...userData,
              displayName: userData.displayName || `${userData.firstName} ${userData.lastName}`,
              isAdmin: userData.role === process.env.NEXT_PUBLIC_ROLE_ADMINS,
              role: userData.role,
            };

            setUser(updatedUser);
            Cookies.set('authToken', user.accessToken, {
              expires: 7,
              secure: true,
              sameSite: 'Strict',
            });

            if (isNewRegistration) {
              toast.success('Selamat datang di aplikasi kami!');
              Cookies.remove('isNewRegistration');
              localStorage.setItem('lastLoginDate', today);
            } else if (!lastLoginDate || lastLoginDate !== today) {
              const displayName = userData.displayName || `${userData.firstName} ${userData.lastName}`;
              toast.success(`Selamat datang kembali, ${displayName}!`);
              localStorage.setItem('lastLoginDate', today);
            }

            Cookies.set('lastLoginTime', new Date().toISOString(), {
              expires: 7,
              secure: true,
              sameSite: 'Strict',
            });
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        toast.error('Terjadi kesalahan saat memuat data pengguna');
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAuthError = (error) => {
    const errorMessages = {
      'auth/invalid-credential': 'Email atau password salah',
      'auth/user-not-found': 'Akun tidak ditemukan',
      'auth/wrong-password': 'Password salah',
      'auth/too-many-requests': 'Terlalu banyak percobaan login. Silakan coba lagi nanti',
    };

    toast.error(errorMessages[error.code] || 'Terjadi kesalahan. Silakan coba lagi');
  };

  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      if (!result.user.emailVerified) {
        toast.error('Silakan verifikasi email Anda terlebih dahulu');
        await signOut(auth);
        return null;
      }

      localStorage.removeItem('lastLoginDate');

      return result;
    } catch (error) {
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