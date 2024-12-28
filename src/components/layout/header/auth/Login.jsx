"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/utils/auth/AuthContext";
import {
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import styles from "@/components/layout/header/Header.module.scss";
import { toast } from "react-hot-toast";
import { auth } from "@/utils/firebase";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login({ onClose }) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");
    if (savedEmail && savedPassword) {
      setFormData({
        email: savedEmail,
        password: savedPassword,
        rememberMe: true,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCredentials = (remember) => {
    if (remember) {
      localStorage.setItem("savedEmail", formData.email);
      localStorage.setItem("savedPassword", formData.password);
    } else {
      localStorage.removeItem("savedEmail");
      localStorage.removeItem("savedPassword");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await login(
        formData.email,
        formData.password,
        formData.rememberMe
      );

      if (result) {
        handleCredentials(formData.rememberMe);
        await setPersistence(
          auth,
          formData.rememberMe ? browserLocalPersistence : browserSessionPersistence
        );
        onClose();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!EMAIL_REGEX.test(resetEmail)) {
      toast.error("Silahkan masukkan email yang valid");
      return;
    }

    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success("Email reset password telah dikirim. Silakan periksa inbox Anda.");
      setResetEmail("");
      setShowForgotPassword(false);
    } catch (error) {
      const errorMessages = {
        'auth/user-not-found': "Email tidak terdaftar",
        'auth/invalid-email': "Format email tidak valid",
        'auth/too-many-requests': "Terlalu banyak permintaan. Silakan coba beberapa saat lagi",
        'auth/network-request-failed': "Gagal terhubung ke server. Periksa koneksi internet Anda"
      };

      toast.error(errorMessages[error.code] || "Terjadi kesalahan. Silakan coba lagi nanti");
    } finally {
      setIsLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <div className={styles.login}>
        <h2 className={styles.title}>Reset Password</h2>
        <form onSubmit={handleForgotPassword}>
          <div className={styles.box}>
            <label htmlFor="resetEmail">Email</label>
            <input
              type="email"
              id="resetEmail"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Kirim Reset Link"}
          </button>
          <button
            type="button"
            onClick={() => {
              setShowForgotPassword(false);
            }}
            className={styles.backButton}
          >
            Kembali ke Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.login}>
      <h2 className={styles.title}>Silahkan Login</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.box}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>
        <div className={styles.box}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>
        <div className={styles.rememberForgot}>
          <div className={styles.remember}>
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              disabled={isLoading}
            />
            <label htmlFor="rememberMe">Ingat Saya</label>
          </div>
          <div className={styles.forgot}>
            <button type="button" onClick={() => setShowForgotPassword(true)}>
              Lupa Password?
            </button>
          </div>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
