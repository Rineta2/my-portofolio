import Link from "next/link";

import { X } from "lucide-react";

import { navLink } from "@/components/data/Header";

import styles from "@/components/layout/header/header.module.scss";

export default function NavList({ pathname, toggleMenu, showHamburgerMenu }) {
    return (
        <ul className={`${styles.nav__list} ${showHamburgerMenu ? styles.menuOpen : ''}`}>
            {navLink.map((item, index) => (
                <li
                    key={index}
                    className={`${styles.nav__item} ${pathname === item.path ? styles.active : ''} ${showHamburgerMenu ? styles.menuOpen : ''}`}
                >
                    <Link
                        href={item.path}
                        className={styles.nav__link}
                        onClick={() => {
                            if (window.innerWidth <= 480) {
                                toggleMenu();
                            }
                        }}
                    >
                        {item.name}
                    </Link>
                </li>
            ))}
            <X className={styles.close} size={24} onClick={toggleMenu} />
        </ul>
    );
}