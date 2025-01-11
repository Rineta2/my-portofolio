import React from "react";

import PhoneInput from "react-phone-number-input";

import "react-phone-number-input/style.css";

import styles from "@/components/layout/header/header.module.scss";

export default function RegisterForm({
  formData,
  handleChange,
  handlePhoneChange,
  handleSubmit,
  loading,
}) {
  return (
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
  );
}
