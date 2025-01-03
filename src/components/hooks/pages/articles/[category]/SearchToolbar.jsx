import React from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import styles from "@/app/articles/Articles.module.scss";
import {
  searchToolbarAnimationCategory,
  searchTitleAnimationCategory,
  searchContainerAnimationCategory,
  searchIconAnimationCategory,
  searchInputAnimationCategory,
} from "@/components/hooks/animation/article/pages/useArticleAnimations";

export default function SearchToolbar({ setIsModalOpen }) {
  return (
    <motion.div
      className={styles.tollbarBottom}
      {...searchToolbarAnimationCategory}
    >
      <motion.h1 {...searchTitleAnimationCategory}>
        Explore all news updates
      </motion.h1>

      <motion.div
        className={styles.searchContainer}
        {...searchContainerAnimationCategory}
      >
        <motion.div {...searchIconAnimationCategory}>
          <Search />
        </motion.div>

        <motion.input
          type="text"
          placeholder="Search Articles..."
          readOnly
          onClick={() => setIsModalOpen(true)}
          {...searchInputAnimationCategory}
        />
      </motion.div>
    </motion.div>
  );
}
