"use client"

import ContactInfo from '@/components/hooks/pages/contact/ContactInfo'

import ContactForm from '@/components/hooks/pages/contact/ContactForm'

import styles from "@/app/contact/Contact.module.scss"

export default function ContactContent() {
    return (
        <div className={`${styles.container} ${styles.contact__container}`}>
            <div className={styles.content}>
                <ContactInfo />
                <ContactForm />
            </div>
        </div>
    )
}
