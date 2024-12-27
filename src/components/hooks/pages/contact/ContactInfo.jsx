import Link from "next/link"
import { socialLink, contact } from "@/components/data/Contact"
import styles from "@/app/contact/Contact.module.scss"

export default function ContactInfo() {
    return (
        <div className={styles.text}>
            <h1>{contact.title}</h1>
            <p>{contact.description}</p>
            <div className={styles.email}>
                <span>Email:</span>
                <Link href={`mailto:${contact.email}`}>{contact.email}</Link>
            </div>

            <div className={styles.social__link}>
                {socialLink.map((item) => (
                    <Link href={item.link} key={item.id} target="_blank" rel="noopener noreferrer">
                        {item.icons}
                    </Link>
                ))}
            </div>
        </div>
    )
}