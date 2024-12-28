import Image from 'next/image';

import Link from 'next/link';

import styles from "@/components/section/portofolio/portofolio.module.scss";

export default function ProjectCard({ item }) {
    return (
        <Link href={`/portofolio/${item.slug}`} className={styles.box}>
            <div className={styles.box__img}>
                <Image src={item.thumbnail} alt={item.title} width={500} height={500} quality={100} />
                <div className={styles.toolbar}>
                    <span className={styles.toolbar__category}>{item.category}</span>
                </div>
            </div>

            <div className={styles.box__info}>
                <h3 className={styles.box__title}>{item.title}</h3>
                <p className={styles.box__description}>
                    {item.description.split(" ").length > 15
                        ? item.description.split(" ").slice(0, 15).join(" ") + "..."
                        : item.description}
                </p>
            </div>
        </Link>
    );
}