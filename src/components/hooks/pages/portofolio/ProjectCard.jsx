import Image from 'next/image'

import Link from 'next/link'

import { formatDate } from '@/components/tools/formatDate'

import styles from "@/app/portofolio/Portofolio.module.scss"

import { handleProjectHover } from '@/components/hooks/animation/portofolio/portofolioAnimations'

export default function ProjectCard({ project, projectRef }) {
    return (
        <div
            className={styles.box}
            ref={projectRef}
            onMouseEnter={(e) => handleProjectHover(e.currentTarget, true)}
            onMouseLeave={(e) => handleProjectHover(e.currentTarget, false)}
        >
            <div className={styles.img}>
                <Image src={project.thumbnail} alt={project.title} width={500} height={500} quality={100} loading='lazy' />
                <div className={styles.toolbar}>
                    <span>{formatDate(project.date)}</span>
                </div>
            </div>
            <h3>{project.title}</h3>
            <p>
                {project.description.split(' ').length > 10
                    ? project.description.split(' ').slice(0, 10).join(' ') + '...'
                    : project.description
                }
            </p>
            <Link href={`/portofolio/${project.slug}`}>Lihat Detail</Link>
        </div>
    )
}