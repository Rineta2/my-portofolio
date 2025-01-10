"use client";
import { useState } from "react";

import SkillsTable from "@/components/hooks/admin/skills/SkillsTable";

import Toolbar from "@/components/hooks/admin/skills/Toolbar";

import { deleteSkill } from "@/components/hooks/admin/skills/utils/handeDelete";

import styles from "@/components/hooks/admin/skills/skills.module.scss";

import { useTheme } from "@/utils/theme/ThemeContext";

export default function SkillsContent({ skills }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [skillsList, setSkillsList] = useState(skills);
  const itemsPerPage = 10;

  const handleDelete = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus skill ini?")) {
      const success = await deleteSkill(id);
      if (success) {
        setSkillsList(skillsList.filter((skill) => skill.id !== id));
      }
    }
  };

  const filteredSkills = skillsList.filter((skill) =>
    skill.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const { isDarkMode } = useTheme();

  return (
    <section
      className={`${styles.skills} ${isDarkMode ? styles.dark : styles.light}`}
    >
      <div className={styles.skills__container}>
        <Toolbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <SkillsTable
          skills={filteredSkills}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          onDelete={handleDelete}
        />
      </div>
    </section>
  );
}
