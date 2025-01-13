import React, { useState } from "react";

import styles from "@/components/hooks/admin/contact/contact.module.scss";

import { X } from "lucide-react";

export default function ReplyModal({
  showModal,
  selectedContact,
  isLoading,
  onSubmit,
  onClose,
}) {
  const [showForm, setShowForm] = useState(false);
  if (!showModal) return null;

  return (
    <div className={`${styles.modal} ${showModal ? styles.show : ""}`}>
      <div className={styles.modal_content}>
        <h2>Balas ke {selectedContact.name}</h2>
        <div className={styles.contact_details}>
          <p>
            <strong>Email:</strong> {selectedContact.email}
          </p>
          <p>
            <strong>Pesan:</strong> {selectedContact.message}
          </p>
        </div>
        {!showForm ? (
          <button onClick={() => setShowForm(true)}>Balas</button>
        ) : (
          <form onSubmit={onSubmit}>
            <textarea
              name="message"
              rows="5"
              placeholder="Tulis pesan Anda..."
              required
            ></textarea>

            <div className={styles.modal_buttons}>
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Mengirim..." : "Kirim"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  onClose();
                }}
              >
                Batal
              </button>
            </div>
          </form>
        )}

        <div className={styles.close} onClick={onClose}>
          <X />
        </div>
      </div>
    </div>
  );
}
