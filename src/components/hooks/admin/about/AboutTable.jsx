import React from "react";

import Image from "next/image";

import Link from "next/link";

import styles from "@/components/hooks/admin/about/about.module.scss";

export default function AboutTable({ aboutList, onDelete }) {
  return (
    <>
      {aboutList.map((item) => (
        <div key={item.id} className={styles.listItem}>
          <div className={styles.listItem__image}>
            {item.imageUrl && (
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={500}
                height={500}
                quality={100}
              />
            )}
          </div>

          <div className={styles.listItem__content}>
            <h1 className={styles.listItem__title}>{item.title}</h1>
            <p className={styles.listItem__description}>{item.description}</p>
            <p className={styles.listItem__description}>{item.description2}</p>

            <div className={styles.listItem__actions}>
              <Link
                href={`/admins/dashboard/about/form?id=${item.id}`}
                className={styles.btn__edit}
              >
                Edit
              </Link>
              <button
                onClick={() => onDelete(item.id)}
                className={styles.btn__delete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
