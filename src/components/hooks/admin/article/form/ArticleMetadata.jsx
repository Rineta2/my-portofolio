import React from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import styles from "@/app/admins/layout.module.scss";

export default function ArticleMetadata({ formData, categories, adminUsers, onChange }) {
    return (
        <>
            <div className={styles.form_group}>
                <label>Publish Date</label>
                <input
                    type="datetime-local"
                    name="publishDate"
                    value={formData.publishDate}
                    onChange={onChange}
                    min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
                    required
                />
            </div>

            <div className={styles.form_group}>
                <label>Category</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={onChange}
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.form_group}>
                <label>Author</label>
                <select
                    name="authorId"
                    value={formData.authorId}
                    onChange={onChange}
                    required
                >
                    <option value="">Select Author</option>
                    {adminUsers.map(admin => (
                        <option key={admin.id} value={admin.id}>
                            {admin.firstName} {admin.lastName} - {admin.role}
                        </option>
                    ))}
                </select>
                {formData.authorId && adminUsers.find(admin => admin.id === formData.authorId)?.photoURL && (
                    <Image
                        src={adminUsers.find(admin => admin.id === formData.authorId).photoURL}
                        alt="Author photo"
                        width={50}
                        height={50}
                        style={{ borderRadius: '50%', marginTop: '10px' }}
                    />
                )}
            </div>
        </>
    );
}