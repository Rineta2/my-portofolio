import Link from "next/link";

import { ChevronLeft } from "lucide-react";

import styles from "@/app/articles/Articles.module.scss";

export default function ArticleHeader({ categoryName }) {
  return (
    <div className={styles.top__heading}>
      <span>{categoryName}</span>
      <Link href="/articles">
        <ChevronLeft />
        Back to Articles
      </Link>
    </div>
  );
}
