"use client";

import React, { useState } from 'react'

import { format } from 'date-fns';

import styles from "@/components/section/achievement/achievement.module.scss"

import Image from "next/image"

import { Eye, X } from "lucide-react"

import { useTheme } from "@/utils/theme/ThemeContext";

import useModalEffects from "@/components/tools/useModalEffect";

export default function AchievmentContent({ achievements, heading }) {
    const sortedAchievements = [...achievements].sort((a, b) => new Date(b.date) - new Date(a.date));

    const { isDarkMode } = useTheme();

    const [open, setOpen] = useState(false);

    const handleOpen = (id) => {
        setOpen(id);
    }

    useModalEffects({
        isOpen: Boolean(open),
        onClose: () => setOpen(false),
        lockScroll: true
    });

    return (
        <section className={`${styles.achievement} ${isDarkMode ? styles.dark : styles.light}`}>
            <div className={`${styles.achievement__container} container`}>
                <div className={styles.achievement__heading}>
                    <h1>{heading.title}</h1>
                    <p>{heading.description}</p>
                </div>

                <div className={styles.achievement__content}>
                    {sortedAchievements.map(({ id, imageUrl, title, date }, index) => (
                        <div
                            key={id}
                            className={`${styles.achievement__item} ${index === 0 ? styles.active : ''}`}
                        >
                            <div className={styles.img}>
                                <Image src={imageUrl} alt={title} width={500} height={500} quality={100} />
                                <div className={styles.achievement__icon} onClick={() => handleOpen(id)}>
                                    <button >
                                        <Eye />
                                    </button>
                                </div>
                            </div>

                            <div className={styles.achievement__info}>
                                <h3>{title}</h3>
                                <span>{format(new Date(date), 'dd MMMM yyyy')}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {open && (
                <div className={styles.achievement__modal}>
                    <div className={styles.modal__content}>
                        <Image
                            src={achievements.find(achievement => achievement.id === open).imageUrl}
                            alt={achievements.find(achievement => achievement.id === open).title}
                            width={500}
                            height={500}
                            quality={100}
                        />

                        <div className={styles.modal__close}>
                            <button onClick={() => setOpen(false)}>
                                <X />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.bg}>
                <Image src={heading.bg} alt="bg" width={500} height={500} quality={100} />
            </div>
        </section>
    )
}

