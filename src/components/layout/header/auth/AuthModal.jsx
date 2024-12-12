import React, { useEffect, useRef } from "react";
import gsap from "gsap";

import { useAuth } from "@/utils/auth/AuthContext";

import AuthModalHeader from "@/components/hooks/layout/auth/AuthModalHeader";

import AuthModalContent from "@/components/hooks/layout/auth/AuthModalContent";

import styles from "@/components/layout/header/header.module.scss";

import useModalEffects from "@/components/tools/useModalEffect";

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
      gsap.to(modalRef.current, {
        duration: 0.3,
        opacity: 1,
        display: "grid",
        scale: 1,
        ease: "power2.out"
      });
      gsap.from(contentRef.current, {
        duration: 0.4,
        y: -50,
        opacity: 0,
        ease: "power2.out"
      });
    } else if (modalRef.current) {
      gsap.to(modalRef.current, {
        duration: 0.3,
        opacity: 0,
        scale: 0.8,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(modalRef.current, { display: "none" });
        }
      });

      gsap.to(contentRef.current, {
        duration: 0.3,
        y: 20,
        opacity: 0,
        ease: "power2.in"
      });
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
