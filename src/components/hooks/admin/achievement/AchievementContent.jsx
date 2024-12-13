"use client"

import React, { useState } from 'react'

import styles from "@/app/admins/layout.module.scss";

import Link from 'next/link';

import { Plus, Pencil, Trash2 } from 'lucide-react';

import useAchievement from '@/components/hooks/admin/achievement/utils/useAchiement';

import Image from 'next/image';

export default function AchievementContent() {
    const { achievementList, handleDelete } = useAchievement();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = achievementList.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(achievementList.length / itemsPerPage);

    // Handle page changes
    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    return (
        <section className={styles.achievement}>
            <div className={`${styles.container} ${styles.achievement__container}`}>
                <div className={styles.toolbar}>
                    <h1>Achievement</h1>

                    <Link href="/admins/dashboard/achievement/form">
                        <Plus />
                        Add Achievement
                    </Link>
                </div>

                <div className={styles.content}>
                    {currentItems.map((achievement) => (
                        <div key={achievement.id} className={styles.card}>
                            <div className={styles.card__image}>
                                <Image
                                    src={achievement.imageUrl}
                                    alt={achievement.title}
                                    className={styles.card__image}
                                    width={500}
                                    height={500}
                                />
                            </div>

                            <div className={styles.card__content}>
                                <h3>{achievement.title}</h3>
                                <div className={styles.card__actions}>
                                    <Link href={`/admins/dashboard/achievement/form?id=${achievement.id}`}>
                                        <Pencil className={styles.edit} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(achievement.id)}
                                        className={styles.delete}
                                    >
                                        <Trash2 />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.pagination}>
                    <span className={styles.pagination__info}>
                        Page {currentPage} of {totalPages || 1}
                    </span>

                    <div className={styles.btn__group}>
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className={styles.pagination__button}
                        >
                            Previous
                        </button>

                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className={styles.pagination__button}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
