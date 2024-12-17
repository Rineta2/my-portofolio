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
    const [showModal, setShowModal] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const itemsPerPage = 5;

    const offset = currentPage * itemsPerPage;

    const filteredProjects = projectList.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentItems = [...filteredProjects]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(offset, offset + itemsPerPage);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const onDeleteClick = (project) => {
        setProjectToDelete(project);
        setShowModal(true);
    };

    const onConfirmDelete = () => {
        handleDelete(projectToDelete.id);
        setShowModal(false);
        setProjectToDelete(null);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(0);
    };

    return (
        <div className={`${styles.container} ${styles.project__container}`}>
            <ProjectToolbar />

            <div className={styles.search__container}>
                <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className={styles.search__input}
                />
            </div>

            <ProjectTable
                currentItems={currentItems}
                onDeleteClick={onDeleteClick}
            />

            <ProjectPagination
                pageCount={Math.ceil(filteredProjects.length / itemsPerPage)}
                handlePageChange={handlePageChange}
            />

            {/* Delete Confirmation Modal */}
            {showModal && (
                <div className={styles.modal__overlay}>
                    <div className={styles.modal}>
                        <h3>Confirm Delete</h3>
                        <p>
                            Are you sure you want to delete{" "}
                            <strong>{projectToDelete?.title}</strong>?
                        </p>
                        <div className={styles.modal__actions}>
                            <button
                                onClick={() => setShowModal(false)}
                                className={styles.btn__cancel}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirmDelete}
                                className={styles.btn__confirm}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
