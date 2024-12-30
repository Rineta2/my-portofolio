import styles from "@/components/section/article/article.module.scss"

const ArticleTags = ({ tags }) => (
    <div className={styles.tags}>
        {tags.map((tag) => (
            <span key={tag.id}>{tag.name}</span>
        ))}
    </div>
);

export default ArticleTags;