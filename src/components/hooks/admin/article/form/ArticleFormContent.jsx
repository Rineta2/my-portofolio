"use client"

import React from 'react';
import styles from "@/app/admins/layout.module.scss";
import ArticleBasicInfo from '@/components/hooks/admin/article/form/ArticleBasicInfo';
import ArticleMetadata from '@/components/hooks/admin/article/form/ArticleMetadata';
import ArticleTags from '@/components/hooks/admin/article/form/ArticleTags';
import ArticleEditor from '@/components/hooks/admin/article/form/ArticleEditor';
import ArticleImage from '@/components/hooks/admin/article/form/ArticleImage';
import { useArticleForm } from '@/components/hooks/admin/article/form/utils/useArticleForm';

export default function ArticleFormContent() {
    const {
        formData,
        categories,
        availableTags,
        adminUsers,
        handleSubmit,
        handleChange,
        handleQuillChange,
        handleImageChange,
    } = useArticleForm();

    return (
        <div className={styles.container}>
            <h1>{formData.id ? 'Edit Article' : 'Create Article'}</h1>
            <form onSubmit={handleSubmit}>
                <ArticleBasicInfo
                    formData={formData}
                    onChange={handleChange}
                />
                <ArticleMetadata
                    formData={formData}
                    categories={categories}
                    adminUsers={adminUsers}
                    onChange={handleChange}
                />
                <ArticleTags
                    formData={formData}
                    availableTags={availableTags}
                    onChange={handleChange}
                />
                <ArticleEditor
                    content={formData.content}
                    onChange={handleQuillChange}
                />
                <ArticleImage
                    imageUrl={formData.imageUrl}
                    folderName={formData.folderName}
                    onChange={handleImageChange}
                    onFolderChange={handleChange}
                />
                <button type="submit" className={styles.button}>
                    {formData.id ? 'Update' : 'Create'}
                </button>
            </form>
        </div>
    );
}