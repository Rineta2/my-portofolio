import React, { useState } from "react";

import { auth, db } from "@/utils/firebase";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

import { parsePhoneNumber, isValidPhoneNumber } from "libphonenumber-js";

import "react-phone-number-input/style.css";

import PhoneInput from "react-phone-number-input";

import styles from "@/components/layout/header/header.module.scss";

import { toast } from "react-hot-toast";

import Cookies from "js-cookie";

export default function Register({ onTabChange }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      phoneNumber: value,
    }));
  };

  const validateForm = () => {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword,
    } = formData;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !password ||
      !confirmPassword
    ) {
      toast.error("Semua bidang harus diisi");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Password dan konfirmasi password tidak cocok");
      return false;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      toast.error("Nomor telepon tidak valid");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const { email, password, firstName, lastName, phoneNumber } = formData;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(userCredential.user);

      const userData = {
        email: userCredential.user.email,
        firstName,
        lastName,
        phoneNumber: parsePhoneNumber(phoneNumber).formatInternational(),
        role: process.env.NEXT_PUBLIC_ROLE_USERS,
        emailVerified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        uid: userCredential.user.uid,
        isNewUser: true,
      };

      await setDoc(
        doc(db, process.env.NEXT_PUBLIC_API_USER, userCredential.user.uid),
        userData
      );

      Cookies.set('isNewRegistration', 'true', {
        expires: 1 / 24,
        secure: true,
        sameSite: "Strict"
      });

      toast.success("Silakan cek email Anda untuk verifikasi akun");
      onTabChange("login");
    } catch (error) {
      toast.error(
        error.code === "auth/email-already-in-use"
          ? "Email sudah terdaftar"
          : "Silakan coba lagi nanti"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.register}>
      <h2 className={styles.title}>Daftar Akun Baru</h2>

      <form onSubmit={handleSubmit}>
        <div className={styles.formBox}>
          <div className={styles.box}>
            <label htmlFor="firstName">Nama Depan</label>
            <input
              minLength={2}
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div className={styles.box}>
            <label htmlFor="lastName">Nama Belakang</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.singleBox}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className={styles.singleBox}>
          <label htmlFor="phoneNumber">Nomor Telepon</label>
          <PhoneInput
            international
            defaultCountry="ID"
            value={formData.phoneNumber}
            onChange={handlePhoneChange}
          />
        </div>

        <div className={styles.singleBox}>
          <label htmlFor="password">Password</label>
          <input
            minLength={6}
            type="password"
            id="password"
            name="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className={styles.singleBox}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            autoComplete="new-password"
            value={formData.confirmPassword}
            pattern={formData.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Mendaftar..." : "Daftar"}
          </button>
        </div>
      </form>
    </div>
  );
}
