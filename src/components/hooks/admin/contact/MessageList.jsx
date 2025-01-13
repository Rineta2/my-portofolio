import React from "react";

import { format } from "date-fns";

import { id } from "date-fns/locale";

import { MailOpen, Trash2, LoaderCircle } from "lucide-react";

import styles from "@/components/hooks/admin/contact/contact.module.scss";

export function MessageList({
  filteredContacts,
  handleReply,
  handleDelete,
  isLoading,
}) {
  return (
    <div className={styles.content}>
      {filteredContacts.map((item) => (
        <div className={styles.message_box} key={item.id}>
          <div className={styles.message_header}>
            <h3>{item.name}</h3>
            <span>{item.email}</span>
            <small>
              {item.createdAt
                ? format(new Date(item.createdAt), "d MMMM yyyy, HH:mm", {
                    locale: id,
                  })
                : "Tanggal tidak tersedia"}
            </small>
          </div>

          <div className={styles.message_actions}>
            <button
              className={styles.reply_button}
              onClick={() => handleReply(item)}
            >
              <MailOpen />
            </button>

            <button
              className={styles.delete_button}
              onClick={() => handleDelete(item.id)}
              disabled={isLoading}
            >
              {isLoading ? <LoaderCircle /> : <Trash2 />}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
