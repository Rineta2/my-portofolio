import React from "react";

import { X } from "lucide-react";

import Image from "next/image";

import styles from "@/components/hooks/admin/yotube/youtube.module.scss";

export default function YoutubeModal({
    isEditing,
    newVideo,
    categories,
    icons,
    setNewVideo,
    handleSubmit,
    setShowModal,
    handleImageUpload,
}) {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>{isEditing ? "Edit Video" : "Add New Video"}</h2>

                <form onSubmit={handleSubmit} className={styles.modalForm}>
                    <div className={styles.formGroup}>
                        <div className={styles.box}>
                            <label htmlFor="title">Title</label>
                            <input
                                id="title"
                                type="text"
                                placeholder="Video Title"
                                value={newVideo.title}
                                onChange={(e) =>
                                    setNewVideo({ ...newVideo, title: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div className={styles.box}>
                            <label htmlFor="url">URL</label>
                            <input
                                id="url"
                                type="text"
                                placeholder="Video URL"
                                value={newVideo.url}
                                onChange={(e) =>
                                    setNewVideo({ ...newVideo, url: e.target.value })
                                }
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <div className={styles.box}>
                            <label htmlFor="date">Date</label>
                            <input
                                id="date"
                                type="date"
                                value={newVideo.date}
                                onChange={(e) =>
                                    setNewVideo({ ...newVideo, date: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div className={styles.box}>
                            <label htmlFor="category">Category</label>
                            <select
                                id="category"
                                value={newVideo.category}
                                onChange={(e) =>
                                    setNewVideo({ ...newVideo, category: e.target.value })
                                }
                                required
                            >
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className={styles.formSingle}>
                        <label htmlFor="thumbnail">Thumbnail</label>
                        <input
                            type="file"
                            id="thumbnail"
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files?.[0]) {
                                    handleImageUpload(e.target.files[0]);
                                }
                            }}
                        />
                        {newVideo.thumbnail && (
                            <Image
                                src={newVideo.thumbnail}
                                alt="Preview"
                                className={styles.thumbnail__preview}
                                width={500}
                                height={500}
                                style={{ maxWidth: '200px', marginTop: '10px' }}
                            />
                        )}
                    </div>

                    <div className={styles.formSingle}>
                        <label>Icons</label>
                        <div className={styles.iconSelector}>
                            <div className={styles.iconGrid}>
                                {icons.map((icon) => (
                                    <div
                                        key={icon.id}
                                        className={`${styles.iconItem} ${newVideo.icons.includes(icon.id) ? styles.active : ""
                                            }`}
                                        onClick={() => {
                                            setNewVideo((prev) => {
                                                if (prev.icons.includes(icon.id)) {
                                                    return {
                                                        ...prev,
                                                        icons: prev.icons.filter((id) => id !== icon.id),
                                                    };
                                                } else {
                                                    return {
                                                        ...prev,
                                                        icons: [...prev.icons, icon.id],
                                                    };
                                                }
                                            });
                                        }}
                                    >
                                        <Image
                                            src={icon.image}
                                            alt={icon.name}
                                            width={24}
                                            height={24}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={styles.modalActions}>
                        <button type="submit">{isEditing ? "Update" : "Add"}</button>
                        <button type="button" onClick={() => setShowModal(false)}>
                            Cancel
                        </button>
                    </div>
                </form>

                <button onClick={() => setShowModal(false)} className={styles.closeButton}>
                    <X size={24} />
                </button>
            </div>
        </div>
    );
}