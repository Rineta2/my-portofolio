import Image from "next/image"

import Link from "next/link"

import { format } from "date-fns"

import styles from "@/components/section/article/article.module.scss"

import { createSlug } from "@/components/tools/stringSlug"

import ArticleTags from "@/components/hooks/section/article/ArticleTag"

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
                />
            </div>
            <div className={styles.article__info}>
                <span className={styles.date}>
                    {format(article.publishDate, "EEEE, dd MMMM yyyy")}
                </span>
                {isMain ? <h3>{article.title}</h3> :
                    imageSize === 200 ? <h4>{article.title}</h4> : <h2>{article.title}</h2>}
                {isMain && <p>{getTruncatedDescription(article.description, 150)}</p>}
                {!isMain && imageSize === 200 && <p>{getTruncatedDescription(article.description, 100)}</p>}
                {!isMain && imageSize === 300 && <p>{getTruncatedDescription(article.description, 350)}</p>}
                <ArticleTags tags={article.tags} />
            </div>
        </Link>
    );
};

export default ArticleCard;