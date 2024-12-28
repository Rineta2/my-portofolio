import React from 'react'

import Image from 'next/image'

import styles from '@/components/section/home/home.module.scss'

import { home } from '@/components/data/Home'

export default function Background() {
    return (
        <div className={styles.back}>
            <Image src={home.pictureBack} alt="home" />
        </div>
    )
}
