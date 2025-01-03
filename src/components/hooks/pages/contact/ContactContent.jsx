"use client";

import ContactInfo from "@/components/hooks/pages/contact/ContactInfo";

import ContactForm from "@/components/hooks/pages/contact/ContactForm";

import styles from "@/app/contact/Contact.module.scss";

import { useTheme } from "@/utils/theme/ThemeContext";

export default function ContactContent() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`${styles.contact__container} ${
        isDarkMode ? styles.dark : styles.light
      } container`}
    >
      <div className={styles.content}>
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  );
}
