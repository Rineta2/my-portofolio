import React from 'react'

import styles from "@/app/admins/layout.module.scss"

import Link from "next/link"

export default function ArticleContent() {
    return (
        <div className={`${styles.article__container} ${styles.container}`}>
            <div className={styles.toolbar}>
                <h1>Article</h1>

                <Link href={"/admins/dashboard/article/form"} className={styles.button}>
                    Add Article
                </Link>
            </div>

            <div className={styles.search__container}>
                <input type="text" placeholder="Search article" className={styles.search__input} />
            </div>
        </div>
    )
}
