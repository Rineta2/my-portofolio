import React from "react";

import CategoryContent from "@/components/hooks/admin/project/category/CategoryContent";

import styles from "@/app/admins/layout.module.scss";

export async function generateMetadata() {
  return {
    title: `Category Management`,
    description: `Manage category section content and settings`,
  };
}

export default async function Category() {
  return (
    <section className={styles.project__category}>
      <CategoryContent />
    </section>
  );
}
