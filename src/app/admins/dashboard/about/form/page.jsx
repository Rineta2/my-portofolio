"use client";
import React from "react";

import { useRouter, useSearchParams } from "next/navigation";

import styles from "@/app/admins/layout.module.scss";

import { Toaster } from "react-hot-toast";

import { useAboutForm } from "@/components/hooks/admin/about/utils/useAboutForm";

import { FormField } from "@/components/hooks/admin/about/form/FormField";

import { ImagePreview } from "@/components/hooks/admin/about/form/ImagePriview";

export default function FormAbout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const {
    formData,
    isLoading,
    handleSubmit,
    handleInputChange,
    handleImageChange,
    previewUrl,
    currentImageUrl,
  } = useAboutForm(id, router);

  return (
    <section className={styles.about__form}>
      <Toaster position="top-center" />

      <div className={`${styles.about__container} ${styles.container}`}>
        <div className={styles.toolbar}>
          <h1>{id ? "Edit" : "Add"} About</h1>

          <button onClick={() => router.back()}>Back</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <FormField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />

          <div className={styles.form__group}>
            <FormField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              isTextArea
              required
            />

            <FormField
              label="Description 2"
              name="description2"
              value={formData.description2}
              onChange={handleInputChange}
              isTextArea
              required
            />
          </div>

          <div className={styles.form__group}>
            <FormField
              label="Image"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
            />

            <ImagePreview
              currentImageUrl={currentImageUrl}
              previewUrl={previewUrl}
            />
          </div>

          <button
            type="submit"
            className={styles.form__submit}
            disabled={isLoading}
          >
            {isLoading
              ? id
                ? "Updating..."
                : "Submitting..."
              : id
                ? "Update"
                : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
}
