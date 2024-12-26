import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BiCategory } from "react-icons/bi";
import { formatDate } from "@/components/tools/formatDate";
import styles from "@/app/portofolio/Portofolio.module.scss";

export function TopProject({ project }) {
  return (
    <Link
      href={`/portofolio/${project.slug}`}
      className={styles.top_project}
      key={project.id}
    >
      <div className={styles.text}>
        <h2>{project.title}</h2>
        <span className={styles.date}>{formatDate(project.date)}</span>
        <p>
          {project.description.split(" ").length > 25
            ? project.description.split(" ").slice(0, 25).join(" ") + "..."
            : project.description}
        </p>
        <div className={styles.tollbar}>
          <span>
            <BiCategory size={30} /> {project.category}
          </span>
        </div>
      </div>
      <div className={styles.Image}>
        <Image
          src={project.thumbnail}
          alt={project.title}
          width={500}
          height={500}
          quality={100}
          loading="lazy"
        />
      </div>
    </Link>
  );
}
