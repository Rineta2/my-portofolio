"use client"

import { useState } from 'react'

import { collection, addDoc } from 'firebase/firestore'

import { toast } from 'react-hot-toast'

import { db } from '@/utils/firebase'

import styles from "@/app/contact/Contact.module.scss"

import ThankYouMessage from '@/components/hooks/pages/contact/ThankYouMessage'

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const validateForm = () => {
        let tempErrors = {}
        if (!formData.name.trim()) {
            tempErrors.name = 'Name is required'
        }
        if (!formData.email.trim()) {
            tempErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = 'Email is invalid'
        }
        if (!formData.message.trim()) {
            tempErrors.message = 'Message is required'
        }
        setErrors(tempErrors)
        return Object.keys(tempErrors).length === 0
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return

        setIsLoading(true)
        try {
            await addDoc(collection(db, process.env.NEXT_PUBLIC_API_CONTACT), {
                ...formData,
                createdAt: new Date()
            })
            setIsSubmitted(true)
            toast.success('Message sent successfully!')
        } catch (error) {
            toast.error('Failed to send message. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    if (isSubmitted) {
        return <ThankYouMessage />
    }

    return (
        <div className={styles.form}>
            <form onSubmit={handleSubmit}>
                <div className={styles.form__group}>
                    {errors.name && <span className={styles.error_message}>{errors.name}</span>}
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={errors.name ? styles.error : ''}
                    />
                </div>

                <div className={styles.form__group}>
                    {errors.email && <span className={styles.error_message}>{errors.email}</span>}
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={errors.email ? styles.error : ''}
                    />
                </div>

                <div className={styles.form__group}>
                    {errors.message && <span className={styles.error_message}>{errors.message}</span>}
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className={errors.message ? styles.error : ''}
                    />
                </div>

                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        </div>
    )
}