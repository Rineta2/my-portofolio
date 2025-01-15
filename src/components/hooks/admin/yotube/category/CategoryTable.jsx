import React from "react";

import { Edit, Trash2 } from "lucide-react";

import styles from "@/components/hooks/admin/yotube/youtube.module.scss";

export default function CategoryTable({
    videosCategory,
    searchTerm,
    pagesVisited,
    itemsPerPage,
    setEditingId,
    setEditingName,
    setIsEditing,
    setIsModalOpen,
    handleDeleteCategory
}) {
    return (
        <div className={styles.table__container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {videosCategory
                        .filter((category) =>
                            category.name.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .sort((a, b) => {
                            return new Date(b.createdAt) - new Date(a.createdAt);
                        })
                        .slice(pagesVisited, pagesVisited + itemsPerPage)
                        .map((category) => (
                            <tr key={category.id} className={styles.tableRow}>
                                <td>{category.name}</td>
                                <td>{new Date(category.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <div className={styles.action__buttons}>
                                        <button
                                            onClick={() => {
                                                setEditingId(category.id);
                                                setEditingName(category.name);
                                                setIsEditing(true);
                                                setIsModalOpen(true);
                                            }}
                                            className={styles.btn__edit}
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCategory(category.id)}
                                            className={styles.deleteButton}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}