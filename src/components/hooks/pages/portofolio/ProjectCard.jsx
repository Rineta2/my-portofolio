import React, { useRef } from "react";

import Link from "next/link";

import Image from "next/image";

import { motion, useInView } from "framer-motion";

import { formatDate } from "@/components/tools/formatDate";

import styles from "@/app/portofolio/Portofolio.module.scss";

import {
  cardAnimation,
  imageAnimation,
  toolbarAnimation,
  viewportConfig,
} from "@/components/hooks/animation/portofolio/pages/portofolioAnimations";

export function ProjectCard({ project }) {
  const ref = useRef(null);
  const isInView = useInView(ref, viewportConfig);

  return (
    <motion.div
      ref={ref}
      initial={cardAnimation.initial}
      animate={isInView ? cardAnimation.animate : cardAnimation.initial}
      transition={cardAnimation.transition}
    >
      <Link
        href={`/portofolio/${project.slug}`}
        className={styles.box}
        key={project.id}
      >
        <motion.div
          className={styles.img}
          initial={imageAnimation.initial}
          animate={isInView ? imageAnimation.animate : imageAnimation.initial}
          transition={imageAnimation.transition}
        >
          <Image
            src={project.thumbnail}
            alt={project.title}
            width={500}
            height={500}
            quality={100}
            loading="lazy"
          />
          <motion.div
            className={styles.toolbar}
            initial={toolbarAnimation.initial}
            animate={
              isInView ? toolbarAnimation.animate : toolbarAnimation.initial
            }
            transition={toolbarAnimation.transition}
          >
            <span>{formatDate(project.date)}</span>
          </motion.div>
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {project.title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {project.description.split(" ").length > 8
            ? project.description.split(" ").slice(0, 8).join(" ") + "..."
            : project.description}
        </motion.p>
      </Link>
    </motion.div>
  );
}
