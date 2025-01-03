import Image from "next/image";

import Link from "next/link";

import styles from "@/app/portofolio/Portofolio.module.scss";

export default function ProjectDetails({ project }) {
  return (
    <aside>
      <h1>{project.title}</h1>

      <div className={styles.category}>
        <span>Category : </span>
        <span>{project.category}</span>
      </div>

      <div className={styles.framework}>
        <span>Framework :</span>
        <div className={styles.icons}>
          {project.icons?.map((icon, index) => (
            <div key={index}>
              <Image src={icon} alt={project.title} width={500} height={500} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.linkPriview}>
        <span>Live Preview : </span>
        <Link href={project.previewLink} target="_blank">
          Preview
        </Link>
      </div>
    </aside>
  );
}
