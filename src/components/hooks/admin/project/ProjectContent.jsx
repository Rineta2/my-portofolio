"use client";

import React, { useState } from "react";
import styles from "@/app/admins/layout.module.scss";
import { deleteProject } from "@/components/hooks/admin/project/utils/useProject";
import ProjectToolbar from "@/components/hooks/admin/project/ProjectToolbar";
import ProjectTable from "@/components/hooks/admin/project/ProjectTable";
import ProjectPagination from "@/components/hooks/admin/project/ProjectPagination";
import { toast } from "react-hot-toast";

export default function ProjectContent({ initialProjects }) {
  const [projects, setProjects] = useState(initialProjects);
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 10;
  const offset = currentPage * itemsPerPage;

  const filteredProjects = projects.filter((project) =>
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

  const onConfirmDelete = async () => {
    setIsLoading(true);
    const loadingToast = toast.loading(
      "Deleting project and associated images..."
    );

    try {
      const updatedProjects = await deleteProject(projectToDelete.id);
      setProjects(updatedProjects);
      setShowModal(false);
      setProjectToDelete(null);
      toast.success("Project and all associated images deleted successfully!");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project. Please try again.");
    } finally {
      toast.dismiss(loadingToast);
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const closeModal = () => {
    if (!isLoading) {
      setShowModal(false);
      setProjectToDelete(null);
    }
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

      <ProjectTable currentItems={currentItems} onDeleteClick={onDeleteClick} />

      <ProjectPagination
        pageCount={Math.ceil(filteredProjects.length / itemsPerPage)}
        handlePageChange={handlePageChange}
      />

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
                onClick={closeModal}
                className={styles.btn__cancel}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={onConfirmDelete}
                className={`${styles.btn__confirm} ${
                  isLoading ? styles.loading : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
