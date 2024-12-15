import React from 'react';

import styles from "@/app/admins/layout.module.scss";

import Image from 'next/image';

export default function TechStack({ icons, formData, handleIconToggle }) {
    return (
        <div className={styles.tech}>
            <label>Tech Stack:</label>
            <div className={styles.techStackGrid}>
                {icons.map((icon) => (
                    <div
                        key={icon.id}
                        className={`${styles.iconItem} ${formData.icons.includes(icon.url) ? styles.active : ''}`}
                        onClick={() => handleIconToggle(icon)}
                    >
                        <Image 
                            src={icon.url} 
                            alt="Tech Stack Icon" 
                            width={80}
                            height={80}
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}