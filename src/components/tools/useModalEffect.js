import { useEffect } from "react";

export default function useModalEffects({ isOpen, onClose, user }) {
  // Effect untuk menutup modal ketika user sudah login
  useEffect(() => {
    if (user) {
      onClose();
    }
  }, [user, onClose]);

  // Effect untuk mengatur overflow body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
}
