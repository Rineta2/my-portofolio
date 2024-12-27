import React from 'react'

import ContactContent from '@/components/hooks/pages/contact/ContactContent'

import TestimonialsClient from "@/components/hooks/pages/testimonials/TestimonialsClient"

import styles from '@/app/contact/Contact.module.scss'

import { Toaster } from "react-hot-toast";

import { fetchTestimonials } from "@/utils/lib/testimonials/FetchTestimonials"

export async function generateMetadata() {
    return {
        title: `Contact - Rizki Ramadhan`,
        description: `Contact Content`,
    };
}

export default async function Contact() {
    const testimonials = await fetchTestimonials();
    return (
        <>
            <Toaster />
            <section className={styles.contact}>
                <ContactContent />
            </section>

            <section className={styles.testimonials}>
                <TestimonialsClient testimonials={testimonials} />
            </section>
        </>

    )
}
