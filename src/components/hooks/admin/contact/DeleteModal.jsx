import React from "react";

import Image from "next/image";

import { LoaderCircle } from "lucide-react";

import mailImg from "@/components/assets/mail/img.png";

import styles from "@/components/hooks/admin/contact/contact.module.scss";

export function DeleteModal({ onCancel, onConfirm, isLoading }) {
  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <Image src={mailImg} alt="mail-picture" />
        <h2>Konfirmasi Penghapusan</h2>
        <p>Apakah Anda yakin ingin menghapus pesan ini?</p>
        <div className={styles.modal_actions}>
          <button className={styles.cancel_button} onClick={onCancel}>
            Batal
          </button>
          <button
            className={styles.delete_button}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? <LoaderCircle /> : "Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
}
