import React from 'react';

import styles from "@/app/admins/layout.module.scss";

import ProjectTableRow from '@/components/hooks/admin/project/ProjectTableRow';

export default function ProjectTable({ currentItems, onDeleteClick }) {
    return (
        <div className={styles.table__container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Thumbnail</th>
                        <th>Created At</th>
                        <th>Tech Stack</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {currentItems.map((project) => (
                        <ProjectTableRow
                            key={project.id}
                            project={project}
                            onDeleteClick={onDeleteClick}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}