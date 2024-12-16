"use client"

import React, { useState } from 'react'

import styles from "@/app/portofolio/Portofolio.module.scss"

import ProjectSwiper from '@/components/hooks/pages/portofolio/slug/PortoSwipper'

import Image from 'next/image'

import Link from 'next/link'

export default function PortofolioDetailsContent({ project }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <section className={styles.portofolioDetails}>
      <div className={styles.portofolioDetails__container}>
        <div className={styles.portofolioDetails__content}>
          <ProjectSwiper
            project={project}
            thumbsSwiper={thumbsSwiper}
            setThumbsSwiper={setThumbsSwiper}
          />

          <aside>
            <h1>{project.title}</h1>

            <div className={styles.category}>
              <span>Category : </span>
              <span>{project.category}</span>
            </div>

            <div className={styles.framework}>
              <span>Framework :</span>

              <div className={styles.icons}>
                {
                  project.icons && project.icons.map((icon, index) => (
                    <div key={index}>
                      <Image src={icon} alt={project.title} width={500} height={500} />
                    </div>
                  ))
                }
              </div>
            </div>

            <div className={styles.linkPriview}>
              <span>Live Preview : </span>

              <Link href={project.previewLink} target="_blank">
                Preview
              </Link>
            </div>

          </aside>
        </div>

        <div className={styles.overlay}></div>

        <div className={styles.textContent}>
          <div dangerouslySetInnerHTML={{ __html: project.content }} />
        </div>
      </div >
    </section >
  )
}
