import React, { useRef } from "react";

import { motion, useInView } from "framer-motion";

import styles from "@/app/portofolio/Portofolio.module.scss";

import {
  sidebarAnimation,
  headingAnimation,
  buttonAnimation,
  viewportConfig,
} from "@/components/hooks/animation/portofolio/pages/portofolioAnimations";

export function CategorySidebar({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, viewportConfig);

  return (
    <motion.div
      ref={ref}
      className={styles.sidebar}
      initial={sidebarAnimation.initial}
      animate={isInView ? sidebarAnimation.animate : sidebarAnimation.initial}
      transition={sidebarAnimation.transition}
    >
      <motion.div
        className={styles.heading}
        initial={headingAnimation.initial}
        animate={isInView ? headingAnimation.animate : headingAnimation.initial}
        transition={headingAnimation.transition}
      >
        <h1>Category</h1>
      </motion.div>

      <motion.button
        initial={buttonAnimation(0).initial}
        animate={
          isInView ? buttonAnimation(0).animate : buttonAnimation(0).initial
        }
        transition={buttonAnimation(0).transition}
        className={selectedCategory === "all" ? styles.active : ""}
        onClick={() => setSelectedCategory("all")}
      >
        All
      </motion.button>

      {categories?.map(({ id, category }, index) => (
        <motion.button
          key={id}
          initial={buttonAnimation(index + 1).initial}
          animate={
            isInView
              ? buttonAnimation(index + 1).animate
              : buttonAnimation(index + 1).initial
          }
          transition={buttonAnimation(index + 1).transition}
          className={selectedCategory === category ? styles.active : ""}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </motion.button>
      ))}
    </motion.div>
  );
}
