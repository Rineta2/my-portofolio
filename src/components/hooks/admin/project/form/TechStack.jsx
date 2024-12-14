import React from 'react';

import { DynamicIcon } from '@/components/hooks/admin/project/techstack/DynamicIcons';

import styles from "@/app/admins/layout.module.scss";

export default function TechStack({ icons, formData, handleIconToggle }) {
    return (
        <div className={styles.tech}>
            <label>Tech Stack:</label>
            <div className={styles.techStackGrid}>
                {icons.map((icon) => (
                    <div
                        key={icon.id}
                        className={`${styles.iconItem} ${formData.icons.includes(icon.name) ? styles.active : ''}`}
                        onClick={() => handleIconToggle(icon.name)}
                    >
                        <DynamicIcon iconName={icon.name} />
                    </div>
                ))}
            </div>
        </div>
    );
}