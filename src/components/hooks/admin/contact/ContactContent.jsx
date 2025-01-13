"use client";

import React, { useState } from "react";

import toast from "react-hot-toast";

import styles from "@/components/hooks/admin/contact/contact.module.scss";

import { useTheme } from "@/utils/theme/ThemeContext";

import { MessageList } from "@/components/hooks/admin/contact/MessageList";

import { SearchBar } from "@/components/hooks/admin/contact/SearchBar";

import { DeleteModal } from "@/components/hooks/admin/contact/DeleteModal";

import ReplyModal from "@/components/hooks/admin/contact/ReplyModal";

import { handleEmailSubmit } from "@/components/hooks/admin/contact/utils/emailHandler";

import { deleteContact } from "@/components/hooks/admin/contact/utils/FetchContact";

export default function ContactContent({ contact }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const { isDarkMode } = useTheme();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredContacts = contact.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchLower) ||
      item.email.toLowerCase().includes(searchLower)
    );
  });

  const handleReply = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const handleDelete = async (contactId) => {
    setContactToDelete(contactId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setIsLoading(true);
    try {
      const result = await deleteContact(contactToDelete);
      if (result.success) {
        toast.success("Pesan berhasil dihapus!");
        window.location.reload();
      } else {
        throw new Error("Gagal menghapus pesan");
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error("Gagal menghapus pesan");
    } finally {
      setIsLoading(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <section
      className={`${styles.contact} ${isDarkMode ? styles.dark : styles.light}`}
    >
      <div className={`${styles.contact__container} container`}>
        <div className={styles.heading}>
          <h1>Pesan Masuk</h1>
          <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
        </div>

        <MessageList
          filteredContacts={filteredContacts}
          handleReply={handleReply}
          handleDelete={handleDelete}
          isLoading={isLoading}
        />

        {showModal && (
          <ReplyModal
            showModal={showModal}
            selectedContact={selectedContact}
            isLoading={isLoading}
            onSubmit={(e) =>
              handleEmailSubmit(e, selectedContact, setIsLoading, setShowModal)
            }
            onClose={() => setShowModal(false)}
          />
        )}

        {showDeleteModal && (
          <DeleteModal
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={confirmDelete}
            isLoading={isLoading}
          />
        )}
      </div>
    </section>
  );
}
