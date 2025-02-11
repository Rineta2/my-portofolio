import Image from 'next/image';

import { User } from 'lucide-react';

import styles from "@/app/contact/Contact.module.scss";

export default function TestimonialsCard({ testimonial }) {
    const { name, position, content, photoURL } = testimonial;

    const avatarUrl = photoURL ? photoURL : '/default-avatar.png';

    return (
        <div className={styles.box}>
            <div className={styles.profile}>
                {photoURL ? (
                    <Image
                        src={avatarUrl}
                        alt={name}
                        width={500}
                        height={500}
                    />
                ) : (
                    <User size={40} />
                )}

                <div className={styles.profile__info}>
                    <h2>{name}</h2>
                    <span>{position}</span>
                </div>
            </div>

            <p>{content}</p>
        </div>
    );
}
