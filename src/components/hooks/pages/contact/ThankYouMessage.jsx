import styles from "@/app/contact/Contact.module.scss"

export default function ThankYouMessage() {
    return (
        <div className={styles.thank_you}>
            <div className={styles.check_icon}>✓</div>
            <h2>Thank You</h2>
            <p>We&apos;re super excited to get started on our collaboration. We&apos;ll be in touch shortly...!</p>
        </div>
    )
}