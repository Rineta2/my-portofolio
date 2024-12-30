import styles from "@/components/section/article/article.module.scss"
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ArticleTags = ({ tags }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <motion.div
            ref={ref}
            className={styles.tags}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1]
            }}
        >
            {tags.map((tag, index) => (
                <motion.span
                    key={tag.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{
                        delay: index * 0.1 + 0.4,
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                >
                    {tag.name}
                </motion.span>
            ))}
        </motion.div>
    );
};

export default ArticleTags;