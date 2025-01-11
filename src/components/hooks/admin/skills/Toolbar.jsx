import Link from "next/link";

import { FaPlus } from "react-icons/fa";

import styles from "@/components/hooks/admin/skills/skills.module.scss";

export default function Toolbar({ searchQuery, setSearchQuery }) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.heading}>
        <h1>Skills</h1>
        <input
          type="text"
          placeholder="Cari skill..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.toolbarActions}>
        <Link href="/admins/dashboard/skills/form">
          <FaPlus /> Tambah Skills
        </Link>
      </div>
    </div>
  );
}
