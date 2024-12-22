import React from 'react';
import Image from 'next/image';
import styles from "@/app/admins/layout.module.scss";

export default function ArticleImage({ imageUrl, folderName, onChange, onFolderChange }) {
    return (
        <div className={styles.form_group}>
            <label>Image</label>
            <div className={styles.form_group}>
                <label>Folder Name</label>
                <input
                    type="text"
                    name="folderName"
                    value={folderName}
                    onChange={onFolderChange}
                    placeholder="e.g., tech-news, lifestyle"
                />
                <small className={styles.helpText}>
                    Enter folder name to organize images (e.g., tech-news)
                </small>
            </div>
            <input
                type="file"
                accept="image/*"
                onChange={onChange}
            />
            {imageUrl && (
                <Image
                    src={imageUrl}
                    alt="Preview"
                    width={200}
                    height={200}
                    style={{ maxWidth: '200px', marginTop: '10px' }}
                />
            )}
        </div>
    );
}