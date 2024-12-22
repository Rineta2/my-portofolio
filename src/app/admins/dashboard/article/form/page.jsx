import React from 'react'

import ArticleFormContent from "@/components/hooks/admin/article/form/ArticleFormContent";

import styles from "@/app/admins/layout.module.scss"

export async function generateMetadata() {
    return {
        title: `Article Form Management`,
        description: `Manage article form section content and settings`,
    };
}

export default function FormArticle() {
    return (
        <section className={styles.article__form}>
            <ArticleFormContent />
        </section>
    )
}
