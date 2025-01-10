import React, { useState } from "react";
import styles from "@/components/layout/header/header.module.scss";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { toast } from "react-hot-toast";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordForm({ setShowForgotPassword }) {
  const [resetEmail, setResetEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!EMAIL_REGEX.test(resetEmail)) {
      return;
    }

    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success(
        "Email reset password telah dikirim. Silakan periksa inbox Anda."
      );
      setResetEmail("");
      setShowForgotPassword(false);
    } catch (error) {
      console.error("Password reset failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
          onClick={() => setShowForgotPassword(false)}
          className={styles.backButton}
        >
          Kembali ke Login
        </button>
      </form>
    </div>
  );
}
