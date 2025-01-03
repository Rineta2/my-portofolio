import styles from "@/app/articles/Articles.module.scss";

import { Search } from "lucide-react";

import { motion } from "framer-motion";

import {
  searchTitleAnimation,
  searchContainerAnimation,
  searchIconAnimation,
  searchInputAnimation,
} from "@/components/hooks/animation/article/pages/useArticleAnimations";

export default function SearchToolbar({ setIsModalOpen }) {
  return (
    <div className={styles.tollbarBottom}>
      <motion.h1 {...searchTitleAnimation}>Explore all news updates</motion.h1>
      <motion.div
        className={styles.searchContainer}
        {...searchContainerAnimation}
      >
        <motion.div {...searchIconAnimation}>
          <Search />
        </motion.div>
        <motion.input
          type="text"
          placeholder="Search Articles..."
          readOnly
          onClick={() => setIsModalOpen(true)}
          {...searchInputAnimation}
        />
      </motion.div>
    </div>
  );
}
