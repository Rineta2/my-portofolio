"use client";

import React from "react";

import { auth } from "@/utils/firebase";

import { updatePassword, updateProfile } from "firebase/auth";

import styles from "@/components/hooks/admin/users/user.module.scss";

export default function StatusContent({ users }) {
  const handleResetPassword = async (userId) => {
    try {
      // Generate password baru (contoh: kombinasi random)
      const newPassword = Math.random().toString(36).slice(-8);

      // Update password menggunakan Firebase Auth
      const user = auth.currentUser;
      await updatePassword(user, newPassword);

      alert(`Password berhasil direset. Password baru: ${newPassword}`);
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Gagal mereset password: " + error.message);
    }
  };

  const handleToggleAccount = async (userId, isDisabled) => {
    try {
      // Update status user menggunakan Firebase Auth
      await updateProfile(auth.currentUser, {
        disabled: !isDisabled,
      });

      alert(
        isDisabled ? "Akun berhasil diaktifkan" : "Akun berhasil dinonaktifkan"
      );
    } catch (error) {
      console.error("Error toggling account status:", error);
      alert("Gagal mengubah status akun: " + error.message);
    }
  };

  return (
    <section className={styles.statusContent}>
      <h1>Status Content</h1>
      <div className={styles.statusContentContainer}>
        {users.map((user) => (
          <div key={user.id} className={styles.userCard}>
            <div>{user.displayName}</div>
            <div className={styles.actions}>
              <button
                onClick={() => handleResetPassword(user.id)}
                className={styles.resetBtn}
              >
                Reset Password
              </button>
              <button
                onClick={() => handleToggleAccount(user.id, user.disabled)}
                className={`${styles.toggleBtn} ${
                  user.disabled ? styles.enable : styles.disable
                }`}
              >
                {user.disabled ? "Enable Account" : "Disable Account"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
