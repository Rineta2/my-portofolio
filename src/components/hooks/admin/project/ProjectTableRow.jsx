import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import styles from "@/app/admins/layout.module.scss";
import { DynamicIcon } from '@/components/hooks/admin/project/techstack/DynamicIcons';

export default function ProjectTableRow({ project, handleDelete }) {
    return (
        <tr>
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
                    <Link
                        href={`/admins/dashboard/project/form?id=${project.id}`}
                        className={styles.btn__edit}
                    >
                        Edit
                    </Link>
                    <button onClick={() => handleDelete(project.id)}>
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
}