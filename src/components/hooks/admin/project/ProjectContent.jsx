"use client"

import React from 'react';

import Link from "next/link";

import styles from "@/app/admins/layout.module.scss";

import useProject from '@/components/hooks/admin/project/utils/useProject';

import Image from 'next/image';

import { FaEdit, FaTrash } from 'react-icons/fa';
import { DynamicIcon } from '@/components/hooks/admin/project/techstack/DynamicIcons';

export default function ProjectContent() {
    const { projectList, handleDelete } = useProject();

    return (
        <div className={`${styles.container} ${styles.project__container}`}>
            <div className={styles.toolbar}>
                <h1>Project</h1>
                <Link href="/admins/dashboard/project/form">
                    Tambah Project
                </Link>
            </div>

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
                        {projectList.map((project) => (
                            <tr key={project.id}>
                                <td>{project.title}</td>
                                <td>{project.category}</td>
                                <td>{project.description}</td>
                                <td>
                                    <Image
                                        src={project.thumbnail}
                                        alt={project.title}
                                        width={50}
                                        height={50}
                                    />
                                </td>
                                <td>{new Date(project.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <div className={styles.icons__container}>
                                        {project.icons.map((iconName) => (
                                            <span key={iconName} className={styles.tech__icon}>
                                                <DynamicIcon iconName={iconName} />
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td>
                                    <div className={styles.action__buttons}>
                                        <Link href={`/admins/dashboard/project/edit/${project.id}`}>
                                            <FaEdit />
                                        </Link>
                                        <button onClick={() => handleDelete(project.id)}>
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
