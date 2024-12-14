"use client"

import React, { useState } from 'react';

import styles from "@/app/admins/layout.module.scss";

import useProject from '@/components/hooks/admin/project/utils/useProject';

import ProjectToolbar from '@/components/hooks/admin/project/ProjectToolbar';

import ProjectTable from '@/components/hooks/admin/project/ProjectTable';

import ProjectPagination from '@/components/hooks/admin/project/ProjectPagination';

export default function ProjectContent() {
    const { projectList, handleDelete } = useProject();
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    const offset = currentPage * itemsPerPage;
    const currentItems = projectList.slice(offset, offset + itemsPerPage);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <div className={`${styles.container} ${styles.project__container}`}>
            <ProjectToolbar />
            <ProjectTable
                currentItems={currentItems}
                handleDelete={handleDelete}
            />
            <ProjectPagination
                pageCount={Math.ceil(projectList.length / itemsPerPage)}
                handlePageChange={handlePageChange}
            />
        </div>
    );
}
