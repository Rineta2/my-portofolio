"use client";

import React from "react";

import { Toaster } from "react-hot-toast";

import IconForm from "@/components/hooks/admin/project/techstack/IconForm";

import IconGrid from "@/components/hooks/admin/project/techstack/IconGrid";

import styles from "@/app/admins/layout.module.scss";

import { useIcons } from "@/components/hooks/admin/project/techstack/utils/useIcons";

export default function TechStackContent({ icons }) {
  const { addIcon, deleteIcon } = useIcons();

  return (
    <section className={styles.project__techStack}>
      <div className={`${styles.techStack__container} container`}>
        <Toaster
          position="top-center"
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 3000 },
            loading: { duration: 3000 },
          }}
        />

        <div className={styles.toolbar}>
          <h1>Tech Stack Icons</h1>
        </div>

        <IconForm addIcon={addIcon} />

        <IconGrid icons={icons} deleteIcon={deleteIcon} />
      </div>
    </section>
  );
}
