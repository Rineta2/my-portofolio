import Image from "next/image"

import Link from "next/link"

import { format } from "date-fns"

import styles from "@/components/section/article/article.module.scss"

import { createSlug } from "@/components/tools/stringSlug"

import ArticleTags from "@/components/hooks/section/article/ArticleTag"

import { motion, useInView } from 'framer-motion'

import { useRef } from 'react'

const ArticleCard = ({ article, imageSize, isMain }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    const slug = `/articles/${createSlug(article.categoryName)}/${createSlug(article.slug)}`;

    const getTruncatedDescription = (description, length) => {
        if (description.length <= length) return description;
        return description.slice(0, length) + '...';
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
            }}
        >
            <Link href={slug} className={styles.article__card}>
                <div className={styles.img}>
                    <Image
                        src={article.imageUrl}
                        alt={article.title}
                        width={imageSize}
                        height={imageSize}
                        quality={100}
                    />
                </div>
                <motion.div
                    className={styles.article__info}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                    }}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{
                        duration: 0.8,
                        delay: 0.2,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                >
                    <span className={styles.date}>
                        {format(article.publishDate, "EEEE, dd MMMM yyyy")}
                    </span>
                    {isMain ? <h3>{article.title}</h3> :
                        imageSize === 200 ? <h4>{article.title}</h4> : <h2>{article.title}</h2>}
                    {isMain && <p>{getTruncatedDescription(article.description, 150)}</p>}
                    {!isMain && imageSize === 200 && <p>{getTruncatedDescription(article.description, 100)}</p>}
                    {!isMain && imageSize === 300 && <p>{getTruncatedDescription(article.description, 350)}</p>}
                    <ArticleTags tags={article.tags} />
                </motion.div>
            </Link>
        </motion.div>
    );
};

export default ArticleCard;