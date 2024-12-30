import styles from "@/components/section/article/article.module.scss"

import ArticleCard from "@/components/hooks/section/article/ArticleCard"

const ArticlesGrid = ({ articles }) => {
    return (
        <div className={styles.articles__grid}>
            <div className={styles.main__article}>
                <div className={styles.top__article}>
                    <ArticleCard article={articles[0]} imageSize={500} isMain={true} />
                </div>

                <div className={styles.side__articles}>
                    {articles.slice(1, 4).map((article) => (
                        <div key={article.id} className={styles.side__article}>
                            <ArticleCard article={article} imageSize={200} isMain={false} />
                        </div>
                    ))}
                </div>
            </div>

            {articles[4] && (
                <div className={styles.bottom__article}>
                    <ArticleCard article={articles[4]} imageSize={300} isMain={false} />
                </div>
            )}
        </div>
    );
};

export default ArticlesGrid;