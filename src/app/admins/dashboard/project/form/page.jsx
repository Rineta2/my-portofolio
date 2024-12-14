import React from 'react'

import FormContent from "@/components/hooks/admin/project/form/FormContent";

import styles from "@/app/admins/layout.module.scss";

export async function generateMetadata() {
    return {
        title: `Project Form`,
        description: `Manage project form content and settings`,
    };
}

export default async function Form() {
    return (
        <section className={styles.project__form}>
            <FormContent />
        </section>
    )
}
