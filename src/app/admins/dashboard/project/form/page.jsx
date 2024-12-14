import React from 'react'

import FormContent from "@/components/hooks/admin/project/form/FormContent";

import styles from "@/app/admins/layout.module.scss";

export async function generateMetadata({ searchParams }) {
    return {
        title: searchParams.id ? "Edit Project" : "Add Project",
        description: searchParams.id ? "Edit existing project" : "Create new project",
    };
}

export default async function Form() {
    return (
        <section className={styles.project__form}>
            <FormContent />
        </section>
    )
}
