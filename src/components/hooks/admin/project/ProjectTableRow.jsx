import React from "react";

import Image from "next/image";

import Link from "next/link";

import styles from "@/components/hooks/admin/project/project.module.scss";

export default function ProjectTableRow({ project, onDeleteClick }) {
  return (
    <tr>
      <td>{project.title}</td>
      <td>{project.category}</td>
      <td>{project.description}</td>
      <td>
        {project.thumbnail && (
          <Image
            src={project.thumbnail}
            alt={project.title}
            width={50}
            height={50}
            unoptimized
          />
        )}
      </td>
      <td>{new Date(project.createdAt).toLocaleDateString()}</td>
      <td>
        <div className={styles.icons__container}>
          {project.icons &&
            project.icons.map((iconUrl, index) => (
              <span key={`icon-${index}`} className={styles.tech__icon}>
                <Image
                  src={iconUrl}
                  alt={`Tech Stack Icon ${index + 1}`}
                  width={80}
                  height={80}
                  unoptimized
                  style={{ objectFit: "contain" }}
                />
              </span>
            ))}
        </div>
      </td>
      <td>
        <div className={styles.action__buttons}>
          <Link
            href={`/admins/dashboard/project/form?id=${project.id}`}
            className={styles.btn__edit}
          >
            Edit
          </Link>
          <button onClick={() => onDeleteClick(project)}>Delete</button>
        </div>
      </td>
    </tr>
  );
}
