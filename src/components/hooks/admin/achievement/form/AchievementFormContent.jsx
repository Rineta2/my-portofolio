"use client"

import React, { useEffect } from 'react'

import { useAchievementForm } from '@/components/hooks/admin/achievement/utils/useAchievementForm'

import styles from "@/app/admins/layout.module.scss"

import Image from 'next/image'

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

    return (
        <section className={styles.achievement}>
            <div className={`${styles.container} ${styles.achievement__container}`}>
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
