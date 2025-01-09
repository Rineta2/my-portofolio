"use client";

import React from "react";

import styles from "@/app/admins/layout.module.scss";

import ArticleBasicInfo from "@/components/hooks/admin/article/form/ArticleBasicInfo";

import ArticleMetadata from "@/components/hooks/admin/article/form/ArticleMetadata";

import ArticleTags from "@/components/hooks/admin/article/form/ArticleTags";

import ArticleEditor from "@/components/hooks/admin/article/form/ArticleEditor";

import ArticleImage from "@/components/hooks/admin/article/form/ArticleImage";

import { useArticleForm } from "@/components/hooks/admin/article/form/utils/useArticleForm";

import Link from "next/link";

import { useSearchParams } from "next/navigation";

import { useTheme } from "@/utils/theme/ThemeContext";

export default function ArticleFormContent() {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

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

  const { isDarkMode } = useTheme();

  return (
    <section
      className={`${styles.article__form} ${
        isDarkMode ? styles.dark : styles.light
      }`}
    >
      <div className={`${styles.article__form__container} container`}>
        <div className={styles.toolbar}>
          <h1>{id ? "Edit Article" : "Create Article"}</h1>

          <Link href="/admins/dashboard/article">Back</Link>
        </div>

        <form onSubmit={handleSubmit}>
          <ArticleImage
            imageUrl={formData.imageUrl}
            folderName={formData.folderName}
            onChange={handleImageChange}
            onFolderChange={handleChange}
          />

          <ArticleBasicInfo formData={formData} onChange={handleChange} />

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

          <button type="submit" className={styles.button}>
            {id ? "Update Article" : "Create Article"}
          </button>
        </form>
      </div>
    </section>
  );
}
