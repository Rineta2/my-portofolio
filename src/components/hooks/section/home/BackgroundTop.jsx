import React from 'react'

import Image from 'next/image'

import styles from '@/components/section/home/home.module.scss'

import { home } from '@/components/data/Home'

export default function BackgroundTop() {
    return (
        <div className={styles.backTop}>
            <Image src={home.pictureBackTop} alt="home" />
        </div>
    )
}
