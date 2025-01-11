import React from "react";
import styles from "@/components/layout/header/header.module.scss";
import { useLogin } from "@/components/hooks/layout/auth/login/useLogin";

export default function LoginForm({ onClose, setShowForgotPassword }) {
  const { formData, isLoading, handleChange, handleSubmit } = useLogin(onClose);

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

        <button type="submit" disabled={isLoading} className={styles.button}>
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
