import React, { useEffect } from "react";

import { useAuth } from "@/utils/auth/AuthContext";

import AuthModalHeader from "@/components/hooks/layout/auth/AuthModalHeader";

import AuthModalContent from "@/components/hooks/layout/auth/AuthModalContent";

import styles from "@/components/layout/header/header.module.scss";

export default function AuthModal({ isOpen, onClose, activeTab, onTabChange }) {
  const { user } = useAuth();

  useEffect(() => {
    if (user && isOpen) {
      onClose();
    }
  }, [user, isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.modal} onClick={onClose}>
      <div
        className={styles.modal__content}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeBtn} onClick={onClose}>
          &times;
        </button>
        <AuthModalHeader activeTab={activeTab} onTabChange={onTabChange} />

        <AuthModalContent
          activeTab={activeTab}
          onClose={onClose}
          onTabChange={onTabChange}
        />
      </div>
    </div>
  );
}
