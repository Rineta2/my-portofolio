import React from "react";

import { SearchSlash } from "lucide-react";

import styles from "@/components/hooks/admin/yotube/youtube.module.scss";

export default function YoutubeHeader({ search, setSearch, openModal }) {
    return (
        <div className={styles.header}>
            <div className={styles.heading}>
                <h1>Youtube Management</h1>
                <div className={styles.search}>
                    <input
                        type="search"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <SearchSlash />
                </div>
            </div>
            <button className={styles.addButton} onClick={() => openModal()}>
                Add Video
            </button>
        </div>
    );
}