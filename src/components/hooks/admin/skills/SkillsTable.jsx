import Link from "next/link";

import { AiOutlineEdit } from "react-icons/ai";

import { BsTrash } from "react-icons/bs";

import { getIconComponent } from "@/components/hooks/admin/skills/utils/iconUtils";

import Pagination from "@/components/hooks/admin/skills/Pagination";

import styles from "@/components/hooks/admin/skills/skills.module.scss";

export default function SkillsTable({
  skills,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  onDelete,
}) {
  const totalPages = Math.ceil(skills.length / itemsPerPage);
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return skills.slice(startIndex, endIndex);
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>No</th>
            <th>Icon</th>
            <th>Title</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {getCurrentPageData().map((skill, index) => {
            const IconComponent = getIconComponent(skill.icon);
            return (
              <tr key={skill.id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{IconComponent && <IconComponent size={24} />}</td>
                <td>{skill.title}</td>
                <td>
                  <div className={styles.listItem__actions}>
                    <Link href={`/admins/dashboard/skills/form?id=${skill.id}`}>
                      <AiOutlineEdit className={styles.editIcon} size={24} />
                    </Link>
                    <button onClick={() => onDelete(skill.id)}>
                      <BsTrash className={styles.deleteIcon} size={24} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
