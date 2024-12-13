"use client"

import React from 'react'

import styles from "@/app/admins/layout.module.scss";

import Link from 'next/link';

import { Plus, Pencil, Trash2 } from 'lucide-react';

import useAchievement from '@/components/hooks/admin/achievement/utils/useAchiement';

import Image from 'next/image';

export default function AchievementContent() {
    const { achievementList, handleDelete } = useAchievement();

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
                    {achievementList.map((achievement) => (
                        <div key={achievement.id} className={styles.card}>
                            <Image
                                src={achievement.imageUrl}
                                alt={achievement.title}
                                className={styles.card__image}
                                width={500}
                                height={500}
                            />
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
            </div>
        </section>
    )
}
