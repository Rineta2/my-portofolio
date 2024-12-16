import Image from 'next/image'
import Link from 'next/link'
import { BiCategory } from "react-icons/bi"
import { formatDate } from '@/components/tools/formatDate'
import styles from "@/app/portofolio/Portofolio.module.scss"

export default function TopProject({ project }) {
    return (
        <div className={styles.top_project}>
            <div className={styles.text}>
                <h1>{project.title}</h1>
                <span className={styles.date}>{formatDate(project.date)}</span>
                <p>
                    {project.description.split(' ').length > 25
                        ? project.description.split(' ').slice(0, 25).join(' ') + '...'
                        : project.description
                    }
                </p>
                <div className={styles.tollbar}>
                    <span><BiCategory size={30} /> {project.category}</span>
                    <Link href={`/portofolio/${project.slug}`}>Live Priview</Link>
                </div>
            </div>
            <div className={styles.Image}>
                <Image src={project.thumbnail} alt={project.title} width={500} height={500} quality={100} loading='lazy' />
            </div>
        </div>
    )
}