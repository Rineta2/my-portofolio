"use client"

import React, { useState } from 'react'

import styles from "@/app/portofolio/Portofolio.module.scss"

import Image from 'next/image'

import { parseISO, compareDesc } from 'date-fns'

import { formatDate } from '@/components/tools/formatDate'

import Link from 'next/link'

import { BiCategory } from "react-icons/bi";

export default function PortofolioContent({ project }) {
    const [selectedCategory, setSelectedCategory] = useState('all')
    const uniqueCategories = [...new Set(project.map(item => item.category))]

    const allSortedProjects = [...project].sort((a, b) => {
        return compareDesc(parseISO(a.date), parseISO(b.date))
    })

    const topProjects = allSortedProjects.slice(0, 1)

    const filteredRemainingProjects = selectedCategory === 'all'
        ? allSortedProjects.filter(project => !topProjects.includes(project))
        : allSortedProjects.filter(project =>
            !topProjects.includes(project) && project.category === selectedCategory
        )

    return (
        <div className={`${styles.portofolio__container} ${styles.container}`}>
            {topProjects.map((item, index) => (
                <div className={styles.top_project} key={index}>
                    <div className={styles.text}>
                        <h1>{item.title}</h1>

                        <span className={styles.date}>{formatDate(item.date)}</span>

                        <p>
                            {item.description.split(' ').length > 25
                                ? item.description.split(' ').slice(0, 25).join(' ') + '...'
                                : item.description
                            }
                        </p>

                        <div className={styles.tollbar}>
                            <span><BiCategory size={30} /> {item.category}</span>

                            <Link href={`/portofolio/${item.slug}`}>Live Priview</Link>
                        </div>
                    </div>

                    <div className={styles.Image}>
                        <Image src={item.thumbnail} alt={item.title} width={500} height={500} quality={100} loading='lazy' />
                    </div>
                </div>
            ))
            }

            <div className={styles.content}>
                <div className={styles.sidebar}>
                    <button
                        className={selectedCategory === 'all' ? styles.active : ''}
                            onClick={() => setSelectedCategory('all')}
                        >
                            All
                        </button>

                    {uniqueCategories.map((category, index) => (
                        <button
                            key={index}
                            className={selectedCategory === category ? styles.active : ''}
                            onClick={() => setSelectedCategory(category)}
                    >
                                {category}
                            </button>
                        ))}
                </div>

                <aside className={styles.aside}>
                    {
                        filteredRemainingProjects.map((item, index) => (
                            <div className={styles.box} key={index}>
                        <div className={styles.img}>
                            <Image src={item.thumbnail} alt={item.title} width={500} height={500} quality={100} loading='lazy' />
                        </div>
                        <h1>{item.title}</h1>
                        <span>{formatDate(item.date)}</span>
                        </div>
                    ))
                    }
                </aside>
            </div>
        </div >
    )
}
