import styles from "@/app/articles/Articles.module.scss";

import Link from "next/link";

import Image from "next/image";

import { createSlug } from "@/components/tools/stringSlug";

import { formatDate } from "@/components/tools/formatDate";

import { motion } from "framer-motion";

import {
  gridItemAnimation,
  imageHoverAnimation,
  textAnimation,
  bottomAnimation,
  categoryAnimation,
} from "@/components/hooks/animation/article/pages/useArticleAnimations";

export default function ArticleGrid({ articles }) {
  return (
    <motion.div
      className={styles.content}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {articles?.map((article, index) => (
        <motion.div
          key={article.id}
          {...gridItemAnimation}
          transition={{
            ...gridItemAnimation.transition,
            delay: index * 0.1,
          }}
        >
          <Link
            href={`/articles/${createSlug(article.categoryName)}/${createSlug(
              article.slug
            )}`}
            className={styles.box}
          >
            <motion.div className={styles.img} {...imageHoverAnimation}>
              <Image
                src={article.imageUrl}
                width={500}
                height={500}
                alt={article.title}
                quality={100}
              />
            </motion.div>

            <motion.div className={styles.text}>
              <motion.h1
                {...textAnimation}
                transition={{
                  ...textAnimation.transition,
                  delay: 0.4 + index * 0.1,
                }}
              >
                {article.title}
              </motion.h1>

              <motion.p
                {...textAnimation}
                transition={{
                  ...textAnimation.transition,
                  delay: 0.5 + index * 0.1,
                }}
              >
                {article.description.length > 100
                  ? `${article.description.substring(0, 100)}...`
                  : article.description}
              </motion.p>

              <motion.div
                className={styles.bottom}
                {...bottomAnimation}
                transition={{
                  ...bottomAnimation.transition,
                  delay: 0.6 + index * 0.1,
                }}
              >
                <motion.span className={styles.category} {...categoryAnimation}>
                  {article.categoryName}
                </motion.span>
                <motion.span className={styles.date} {...categoryAnimation}>
                  {formatDate(article.createdAt)}
                </motion.span>
              </motion.div>
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
