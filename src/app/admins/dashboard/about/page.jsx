"use client";

import React from "react";

import AboutTable from "@/components/hooks/admin/about/AboutTable";

import AboutToolbar from "@/components/hooks/admin/about/AboutToolbar";

import useAbout from "@/components/hooks/admin/about/utils/useAbout";

import styles from "@/app/admins/layout.module.scss";

export default function About() {
  const { aboutList, handleDelete } = useAbout();

  return (
    <section className={styles.about}>
      <div className={`${styles.about__container} ${styles.container}`}>
        <AboutToolbar />

        <AboutTable aboutList={aboutList} onDelete={handleDelete} />
      </div>
    </section>
  );
}