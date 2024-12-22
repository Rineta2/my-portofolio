import React from 'react'

import ArticleTagsContent from "@/components/hooks/admin/article/tags/ArticleTagsContent"

import styles from "@/app/admins/layout.module.scss"

export async function generateMetadata() {
    return {
        title: `Article Tags Management`,
        description: `Manage article tags section content and settings`,
    };
}

export default function Tags() {
    return (
        <section className={styles.article__tags}>
            <ArticleTagsContent />
        </section>
    )
}
