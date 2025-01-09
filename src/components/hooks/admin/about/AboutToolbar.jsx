import React from "react";

import Link from "next/link";

import styles from "@/app/admins/layout.module.scss";

import { Plus } from "lucide-react";

export default function AboutToolbar() {
  return (
    <div className={styles.toolbar}>
      <h1>About Us</h1>
      <Link href="/admins/dashboard/about/form">
        <Plus />
        Tambah About
      </Link>
    </div>
  );
}
