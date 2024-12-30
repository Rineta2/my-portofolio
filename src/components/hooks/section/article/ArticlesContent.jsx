"use client";

import React from 'react'

import styles from "@/components/section/article/article.module.scss"

import Link from "next/link"

import { useTheme } from "@/utils/theme/ThemeContext"

import { ArrowRight } from 'lucide-react'

import Image from "next/image"

import ArticlesGrid from "@/components/hooks/section/article/ArticleGrid"

export default function ArticlesContent({ articles, heading }) {
    const { isDarkMode } = useTheme();

    const sortedArticles = [...articles]
        .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
        .slice(0, 5);

    return (
        <section className={`${styles.article} ${isDarkMode ? styles.dark : styles.light}`}>
            <div className={`${styles.article__container} container`}>
                <div className={styles.article__heading}>
                    <h1 className={styles.article__title}>{heading.title}</h1>
                    <Link href={heading.path} className={styles.article__link}>
                        {heading.name} <ArrowRight />
                    </Link>
                </div>

                {sortedArticles.length > 0 && (
                    <ArticlesGrid articles={sortedArticles} />
                )}

                <div className={styles.bg}>
                    <Image src={heading.img} alt={heading.title} width={500} height={500} quality={100} />
                </div>
            </div>
        </section>
    )
}
