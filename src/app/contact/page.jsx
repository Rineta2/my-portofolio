import React from 'react'

import ContactContent from '@/components/hooks/pages/contact/ContactContent'

import TestimonialsContent from "@/components/hooks/pages/testimonials/TestimonialsContent"

import styles from '@/app/contact/Contact.module.scss'

import { Toaster } from "react-hot-toast";

export async function generateMetadata() {
    return {
        title: `Contact - Rizki Ramadhan`,
        description: `Contact Content`,
    };
}

export default async function Contact() {
    return (
        <>
            <Toaster />
            <section className={styles.contact}>
                <ContactContent />
            </section>

            <section className={styles.testimonials}>
                <TestimonialsContent />
            </section>
        </>

    )
}
