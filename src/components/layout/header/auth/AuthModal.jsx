import React, { useEffect, useRef } from "react";

import { useAuth } from "@/utils/auth/AuthContext";

import AuthModalHeader from "@/components/hooks/layout/auth/AuthModalHeader";

import AuthModalContent from "@/components/hooks/layout/auth/AuthModalContent";

import styles from '@/components/layout/header/header.module.scss';

import useModalEffects from "@/components/tools/useModalEffect";

import { openModalAnimation, closeModalAnimation } from "@/components/hooks/animation/header/authModalAnimation";

export default function AuthModal({ isOpen, onClose, activeTab, onTabChange }) {
  const { user } = useAuth();
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useModalEffects({ isOpen, onClose, user });

  useEffect(() => {
    if (user && isOpen) {
      onClose();
    }
  }, [user, isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      openModalAnimation(modalRef.current, contentRef.current);
    } else if (modalRef.current) {
      closeModalAnimation(modalRef.current, contentRef.current);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className={`${styles.modal} ${isOpen ? styles.open : ""}`}
      onClick={onClose}
      style={{ opacity: 0, display: "none" }}
    >
      <div
        ref={contentRef}
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
