import styles from "@/components/section/article/article.module.scss"
import ArticleCard from "@/components/hooks/section/article/ArticleCard"
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ArticlesGrid = ({ articles }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                when: "beforeChildren"
            }
        }
    }

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={styles.articles__grid}
        >
            <motion.div className={styles.main__article}>
                <motion.div
                    className={styles.top__article}
                    variants={{
                        hidden: { opacity: 0, y: 50 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.5 }
                        }
                    }}
                >
                    <ArticleCard article={articles[0]} imageSize={500} isMain={true} />
                </motion.div>

                <div className={styles.side__articles}>
                    {articles.slice(1, 4).map((article, index) => (
                        <motion.div
                            key={article.id}
                            className={styles.side__article}
                            variants={{
                                hidden: { opacity: 0, x: -50 },
                                visible: {
                                    opacity: 1,
                                    x: 0,
                                    transition: {
                                        duration: 0.5,
                                        delay: index * 0.1
                                    }
                                }
                            }}
                        >
                            <ArticleCard article={article} imageSize={200} isMain={false} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {articles[4] && (
                <motion.div
                    className={styles.bottom__article}
                    variants={{
                        hidden: { opacity: 0, y: 50 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 0.5,
                                delay: 0.4
                            }
                        }
                    }}
                >
                    <ArticleCard article={articles[4]} imageSize={300} isMain={false} />
                </motion.div>
            )}
        </motion.div>
    );
};

export default ArticlesGrid;