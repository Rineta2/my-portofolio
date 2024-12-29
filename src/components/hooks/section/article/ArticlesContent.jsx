"use client";

import React from 'react'

import styles from "@/components/section/article/article.module.scss"

import Link from "next/link"

import { useTheme } from "@/utils/theme/ThemeContext";

import { format } from "date-fns"

import Image from "next/image"

import { createSlug } from "@/components/tools/stringSlug"

import { ArrowRight } from 'lucide-react';

// Komponen untuk menampilkan tags
const ArticleTags = ({ tags }) => (
    <div className={styles.tags}>
        {tags.map((tag) => (
            <span key={tag.id}>{tag.name}</span>
        ))}
    </div>
);

// Komponen untuk artikel individual
const ArticleCard = ({ article, imageSize, isMain }) => {
    const slug = `/articles/${createSlug(article.categoryName)}/${createSlug(article.slug)}`;

    const getTruncatedDescription = (description, length) => {
        if (description.length <= length) return description;
        return description.slice(0, length) + '...';
    };

    return (
        <Link href={slug} className={styles.article__card}>
            <div className={styles.img}>
                <Image
                    src={article.imageUrl}
                    alt={article.title}
                    width={imageSize}
                    height={imageSize}
                    quality={100}
                    loading="lazy"
                />
            </div>
            <div className={styles.article__info}>
                <span className={styles.date}>
                    {format(article.publishDate, "EEEE, dd MMMM yyyy")}
                </span>
                {isMain ? <h2>{article.title}</h2> :
                    imageSize === 200 ? <h4>{article.title}</h4> : <h3>{article.title}</h3>}
                {isMain && <p>{getTruncatedDescription(article.description, 150)}</p>}
                {!isMain && imageSize === 200 && <p>{getTruncatedDescription(article.description, 50)}</p>}
                {!isMain && imageSize === 300 && <p>{getTruncatedDescription(article.description, 350)}</p>}
                <ArticleTags tags={article.tags} />
            </div>
        </Link>
    );
};

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
                    <Link href={heading.path} className={styles.article__link}>{heading.name} <ArrowRight /></Link>
                </div>

                {sortedArticles.length > 0 && (
                    <div className={styles.articles__grid}>
                        <div className={styles.main__article}>
                            <div className={styles.top__article}>
                                <ArticleCard article={sortedArticles[0]} imageSize={500} isMain={true} />
                            </div>

                            <div className={styles.side__articles}>
                                {sortedArticles.slice(1, 4).map((article) => (
                                    <div key={article.id} className={styles.side__article}>
                                        <ArticleCard article={article} imageSize={200} isMain={false} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {sortedArticles[4] && (
                            <div className={styles.bottom__article}>
                                <ArticleCard article={sortedArticles[4]} imageSize={300} isMain={false} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}
