export const revalidate = 30;

import React from "react";

import { fetchProjects } from "@/utils/lib/project/FetchProject";

import styles from "@/app/portofolio/Portofolio.module.scss";

import PortofolioContent from "@/components/hooks/pages/portofolio/PortofolioContent";

export async function generateMetadata() {
  return {
    title: `Portofolio - Rizki Ramadhan`,
    description: `Portofolio Content`,
  };
}

export default async function testing() {
  const projects = await fetchProjects();
  const categories = await fetchProjects();

  return (
    <section className={styles.portofolio}>
      <PortofolioContent projects={projects} categories={categories} />
    </section>
  );
}
