import React from 'react'

import ArticleCategoryContent from "@/components/hooks/admin/article/category/ArticleCategoryContent";

import styles from "@/app/admins/layout.module.scss"

export async function generateMetadata() {
    return {
        title: `Article Category Management`,
        description: `Manage article category section content and settings`,
    };
}

export default function Category() {
    return (
        <section className={styles.article__category}>
            <ArticleCategoryContent />
        </section>
    )
}
