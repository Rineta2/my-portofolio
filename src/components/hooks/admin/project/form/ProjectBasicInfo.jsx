import React from 'react';

import styles from "@/app/admins/layout.module.scss";

export default function ProjectBasicInfo({ formData, handleChange }) {
    return (
        <>
            <div className={styles.form__double}>
                <div className={styles.project__form__input}>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.project__form__input}>
                    <label>Slug:</label>
                    <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        required
                        readOnly
                    />
                </div>
            </div>

            <div className={styles.form__single}>
                <label>Description:</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>
        </>
    );
}