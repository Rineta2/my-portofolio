"use client";

import React from "react";

import styles from "@/components/layout/header/header.module.scss";

import { logoName, navLink } from "@/components/data/Header";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { ArrowUpRight, CircleEllipsis } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} ${styles.container}`}>
        {logoName.map((item, index) => {
          return (
            <Link href={item.path} key={index} className={styles.nav__logo}>
              {item.name}
            </Link>
          );
        })}

        <ul className={styles.nav__list}>
          {navLink.map((item) => {
            return (
              <li
                key={item.id}
                className={`${styles.nav__item} ${
                  pathname === item.path ? styles.item__active : ""
                }`}
              >
                <Link href={item.path} className={styles.nav__link}>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <button className={styles.nav__button}>
          Login <ArrowUpRight className="arrow" />
        </button>

        <button className={styles.hamburger}>
          <CircleEllipsis />
        </button>
      </nav>
    </header>
  );
}
