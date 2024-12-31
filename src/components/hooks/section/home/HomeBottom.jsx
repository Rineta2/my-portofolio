import React from "react";

import Link from "next/link";

import { IoMdArrowDropdown } from "react-icons/io";

import styles from "@/components/section/home/home.module.scss";

export default function HomeBottom({ icons }) {
  return (
    <div className={styles.bottom}>
      <a href="#about" className={styles.left}>
        <span>Scroll Down</span>
        <IoMdArrowDropdown />
      </a>

      <div className={styles.right}>
        {icons.map((icon) => (
          <Link href={icon.path} key={icon.id} className={styles.box__icons}>
            {icon.icons}
          </Link>
        ))}
      </div>
    </div>
  );
}
