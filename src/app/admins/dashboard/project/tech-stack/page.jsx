import React from 'react'

import TechStackContent from '@/components/hooks/admin/project/techstack/TechStackContent';

import styles from "@/app/admins/layout.module.scss";

export async function generateMetadata() {
    return {
        title: `Tech Stack Management`,
        description: `Manage tech stack section content and settings`,
    };
}

export default function TechStack() {
    return (
        <section className={styles.project__techStack}>
            <TechStackContent />
        </section>
    )
}
