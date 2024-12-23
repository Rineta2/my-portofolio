import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import styles from "@/app/admins/layout.module.scss";

export default function ArticleMetadata({
  formData,
  categories,
  adminUsers,
  onChange,
}) {
  return (
    <>
      <div className={styles.form_group}>
        <div className={styles.box}>
          <label>Publish Date</label>
          <input
            type="datetime-local"
            name="publishDate"
            value={formData.publishDate}
            onChange={onChange}
            min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
            required
          />
        </div>

        <div className={styles.box}>
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={onChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.form__single}>
        <label>Author</label>
        <select
          name="authorId"
          value={formData.authorId}
          onChange={onChange}
          required
          className={styles.multiSelect}
        >
          <option value="">Select Author</option>
          {adminUsers.map((admin) => (
            <option key={admin.id} value={admin.id}>
              {admin.firstName} {admin.lastName} - {admin.role}
            </option>
          ))}
        </select>

        {formData.authorId &&
          adminUsers.find((admin) => admin.id === formData.authorId)
            ?.photoURL && (
            <Image
              src={
                adminUsers.find((admin) => admin.id === formData.authorId)
                  .photoURL
              }
              alt="Author photo"
              width={150}
              height={150}
              style={{
                borderRadius: "50%",
                marginTop: "10px",
                objectFit: "cover",
              }}
            />
          )}
      </div>
    </>
  );
}
