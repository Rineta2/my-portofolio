"use client"

import React, { useEffect } from 'react'
import { useAchievementForm } from '@/components/hooks/admin/achievement/utils/useAchievementForm'
import styles from "@/app/admins/layout.module.scss"
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'

export default function AchievementFormContent({ id }) {
    const {
        formData,
        isLoading,
        handleSubmit,
        handleInputChange,
        handleImageChange,
        previewUrl,
        currentImageUrl,
        fetchAchievement,
    } = useAchievementForm()

    useEffect(() => {
        if (id) {
            fetchAchievement(id)
        }
    }, [id, fetchAchievement])

    const formattedDate = formData.date ? format(new Date(formData.date), 'yyyy-MM-dd') : ''

    return (
        <section className={styles.achievement__form}>
            <div className={`${styles.container} ${styles.achievement__container}`}>
                <div className={styles.toolbar}>
                    <h1>{id ? "Edit Achievement" : "Add Achievement"}</h1>
                    <Link href="/admins/dashboard/achievement">
                        Kembali
                    </Link>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={styles.form__group}>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className={styles.form__group}>
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formattedDate}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className={styles.form__group}>
                        <label htmlFor="image">Image</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {(previewUrl || currentImageUrl) && (
                            <Image
                                src={previewUrl || currentImageUrl}
                                alt="Preview"
                                width={500}
                                height={500}
                            />
                        )}
                    </div>

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save Achievement'}
                    </button>
                </form>
            </div>
        </section>
    )
}
