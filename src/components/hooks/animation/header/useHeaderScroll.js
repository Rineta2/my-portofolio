import { useEffect } from "react";

import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "@/components/layout/header/header.module.scss";

export default function useHeaderScroll(pathname) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const header = document.querySelector(`.${styles.header}`);
    if (!header) return;

    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.killTweensOf(header);

    if (window.scrollY > 100) {
      header.classList.add(styles.sticky);
    } else {
      header.classList.remove(styles.sticky);
    }

    const handleScroll = () => {
      if (window.scrollY > 100) {
        header.classList.add(styles.sticky);
      } else {
        header.classList.remove(styles.sticky);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);
}
