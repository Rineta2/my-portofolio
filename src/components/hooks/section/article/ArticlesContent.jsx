"use client";

import React from 'react'

import styles from "@/components/section/article/article.module.scss"

import Link from "next/link"

import { useTheme } from "@/utils/theme/ThemeContext"

import { ArrowRight } from 'lucide-react'

import ArticlesGrid from "@/components/hooks/section/article/ArticleGrid"

import { motion } from 'framer-motion'

export default function ArticlesContent({ articles, heading }) {
    const { isDarkMode } = useTheme();

    const sortedArticles = [...articles]
        .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
        .slice(0, 5);

    return (
        <section className={`${styles.article} ${isDarkMode ? styles.dark : styles.light}`}>
            <motion.div
                className={`${styles.article__container} container`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className={styles.article__heading}>
                    <h1 className={styles.article__title}>{heading.title}</h1>
                    <Link href={heading.path} className={styles.article__link}>
                        {heading.name} <ArrowRight />
                    </Link>
                </div>

                {sortedArticles.length > 0 && (
                    <ArticlesGrid articles={sortedArticles} />
                )}
            </motion.div>
        </section>
    )
}
