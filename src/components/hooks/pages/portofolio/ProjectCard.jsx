import React from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/components/tools/formatDate";
import styles from "@/app/portofolio/Portofolio.module.scss";

export function ProjectCard({ project, ref }) {
  return (
    <Link
      href={`/portofolio/${project.slug}`}
      className={styles.box}
      key={project.id}
      ref={ref}
    >
      <div className={styles.img}>
        <Image
          src={project.thumbnail}
          alt={project.title}
          width={500}
          height={500}
          quality={100}
          loading="lazy"
        />
        <div className={styles.toolbar}>
          <span>{formatDate(project.date)}</span>
        </div>
      </div>
      <h3>{project.title}</h3>
      <p>
        {project.description.split(" ").length > 8
          ? project.description.split(" ").slice(0, 8).join(" ") + "..."
          : project.description}
      </p>
    </Link>
  );
}
