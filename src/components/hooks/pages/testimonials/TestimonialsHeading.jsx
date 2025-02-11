import React from 'react'

import { testiomials } from "@/components/data/Contact"

import styles from "@/app/contact/Contact.module.scss"

export default function TestimonialsHeading() {
    return (
        <div className={styles.heading}>
            <span>{testiomials.icons}</span>
            <h1>{testiomials.title}</h1>
            <p>{testiomials.desc}</p>
        </div>
    )
}
