import React, { useEffect, useRef } from "react";

import Link from "next/link";

import { IoMdArrowDropdown } from "react-icons/io";

import styles from "@/components/section/home/home.module.scss";

import { initializeHomeBottomAnimation } from "@/components/hooks/animation/home/buttons/HomeAnimation";

export default function HomeBottom({ icons }) {
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    initializeHomeBottomAnimation(leftRef, rightRef);
  }, []);

  return (
    <div className={styles.bottom}>
      <a href="#about" className={styles.left} ref={leftRef}>
        <span>Scroll Down</span>
        <IoMdArrowDropdown />
      </a>

      <div className={styles.right} ref={rightRef}>
        {icons.map((icon) => (
          <Link
            href={icon.path}
            key={icon.id}
            className={styles.box__icons}
            target="_blank"
            rel="noopener noreferrer"
          >
            {icon.icons}
          </Link>
        ))}
      </div>
    </div>
  );
}
