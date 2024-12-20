import React from 'react'

import ArticleContent from '@/components/hooks/admin/article/ArticleContent'

import styles from "@/app/admins/layout.module.scss"

export async function generateMetadata() {
    return {
        title: `Article Management`,
        description: `Manage article section content and settings`,
    };
}

export default async function Article() {
    return (
        <section className={styles.article}>
            <ArticleContent />
        </section>
    )
}
