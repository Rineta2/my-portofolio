"use client";
import React from "react";

import { Toaster } from "react-hot-toast";

import styles from "@/components/hooks/admin/project/project.module.scss";

import useProjectForm from "@/components/hooks/admin/project/form/utils/useProjectForm";

import ProjectBasicInfo from "@/components/hooks/admin/project/form/ProjectBasicInfo";

import ProjectMedia from "@/components/hooks/admin/project/form/ProjectMedia";

import ProjectDetails from "@/components/hooks/admin/project/form/ProjectDetails";

import TechStack from "@/components/hooks/admin/project/form/TechStack";

import ContentEditor from "@/components/hooks/admin/project/form/ContentEditor";

export default function ProjectForm() {
  const {
    formData,
    loading,
    uploadProgress,
    handleSubmit,
    handleChange,
    setFormData,
    handleImageChange,
    handleThumbnailChange,
    handleImageReorder,
    handleIconToggle,
    handleDeleteImage,
    thumbnail,
    setThumbnail,
    thumbnailPreview,
    imagesPreview,
    categories,
    icons,
    id,
  } = useProjectForm();

  return (
    <section className={styles.project__form}>
      <div className={`${styles.project__form__container} container`}>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#333",
              color: "#fff",
            },
            success: {
              style: {
                background: "green",
              },
            },
            error: {
              style: {
                background: "red",
              },
            },
          }}
        />
        <h1>{id ? "Edit Project" : "Add New Project"}</h1>

        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className={styles.progress}>
            <div
              className={styles.progress__bar}
              style={{ width: `${uploadProgress}%` }}
            />
            <span>{uploadProgress}%</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <ProjectBasicInfo formData={formData} handleChange={handleChange} />

          <ProjectMedia
            thumbnail={thumbnail}
            setThumbnail={setThumbnail}
            thumbnailPreview={thumbnailPreview}
            imagesPreview={imagesPreview}
            handleImageChange={handleImageChange}
            handleThumbnailChange={handleThumbnailChange}
            handleImageReorder={handleImageReorder}
            handleDeleteImage={handleDeleteImage}
            id={id}
          />

          <ProjectDetails
            formData={formData}
            handleChange={handleChange}
            categories={categories}
          />

          <TechStack
            icons={icons}
            formData={formData}
            handleIconToggle={handleIconToggle}
          />

          <ContentEditor formData={formData} setFormData={setFormData} />

          <button
            type="submit"
            className={styles.form__button}
            disabled={loading}
          >
            {loading ? (
              <span>
                {uploadProgress > 0
                  ? `Uploading... ${uploadProgress}%`
                  : "Processing..."}
              </span>
            ) : id ? (
              "Update Project"
            ) : (
              "Save Project"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
