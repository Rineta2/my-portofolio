import React from "react";

import { SearchCheck } from "lucide-react";

import styles from "@/components/hooks/admin/contact/contact.module.scss";

export function SearchBar({ searchTerm, handleSearch }) {
  return (
    <div className={styles.search_container}>
      <input
        type="text"
        placeholder="Cari berdasarkan nama atau email..."
        value={searchTerm}
        onChange={handleSearch}
        className={styles.search_input}
      />
      <SearchCheck />
    </div>
  );
}
