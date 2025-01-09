import React from "react";
import styles from "@/app/admins/layout.module.scss";
import { fetchProjects } from "@/components/hooks/admin/project/utils/useProject";
import ProjectContent from "@/components/hooks/admin/project/ProjectContent";

export async function generateMetadata() {
  return {
    title: `Project Management`,
    description: `Manage project section content and settings`,
  };
}

export default async function Project() {
  const initialProjects = await fetchProjects();
  return (
    <section className={styles.project}>
      <ProjectContent initialProjects={initialProjects} />
    </section>
  );
}
