import React from "react";

import { SearchSlash, Plus } from "lucide-react";

import styles from "@/components/hooks/admin/yotube/youtube.module.scss";

export default function CategoryHeader({ searchTerm, setSearchTerm, setIsModalOpen }) {
    return (
        <div className={styles.header}>
            <div className={styles.heading}>
                <h1>Category Management</h1>

                <div className={styles.search}>
                    <input
                        type="search"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <SearchSlash />
                </div>
            </div>

            <div className={styles.addSection}>
                <button
                    className={styles.addButton}
                    onClick={() => setIsModalOpen(true)}
                >
                    <Plus />
                    Add Category
                </button>
            </div>
        </div>
    );
}