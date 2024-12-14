import React from 'react'

import styles from "@/app/admins/layout.module.scss";

export async function generateMetadata() {
  return {
    title: `Project Management`,
    description: `Manage project section content and settings`,
  };
}

import ProjectContent from "@/components/hooks/admin/project/ProjectContent";

export default async function Project() {
  return (
    <section className={styles.project}>
      <ProjectContent />
    </section>
  )
}
