import React from "react";

import Link from "next/link";

import styles from "@/components/hooks/admin/project/project.module.scss";

export default function ProjectToolbar() {
  return (
    <div className={styles.toolbar}>
      <h1>Project</h1>

      <Link href="/admins/dashboard/project/form">Tambah Project</Link>
    </div>
  );
}
