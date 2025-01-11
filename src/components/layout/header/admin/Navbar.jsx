"use client";

import React, { useState, useEffect, useCallback } from "react";

import { User, ChevronsRight, ChevronDown, X } from "lucide-react";

import Image from "next/image";

import Link from "next/link";

import { useAuth } from "@/utils/auth/AuthContext";

import { navbar } from "@/components/data/Admin";

import styles from "@/app/admins/layout.module.scss";

import { usePathname } from "next/navigation";

import { useTheme } from "@/utils/theme/ThemeContext";

import clsx from "clsx";

import { ThemeToggle } from "@/components/layout/header/admin/ThemeToggle";

export default function Navbar({ isOpen, toggleSidebar }) {
  const { user } = useAuth();

  const [openSubmenu, setOpenSubmenu] = useState(null);

  const pathname = usePathname();

  const { isDarkMode } = useTheme();

  useEffect(() => {
    setOpenSubmenu(null);
  }, [pathname]);

  const toggleSubmenu = (id) => {
    setOpenSubmenu(openSubmenu === id ? null : id);
  };

  const handleLinkClick = useCallback(() => {
    if (isOpen) {
      toggleSidebar();
    }
    setOpenSubmenu(null);
  }, [toggleSidebar, isOpen]);

  return (
    <div
      className={clsx(
        styles.nav,
        isDarkMode ? styles.dark : styles.light,
        isOpen ? styles.open : styles.close
      )}
    >
      <nav className={`${styles.navbar} container`}>
        <div className={styles.navbarHeader}>
          <div className={styles.navbarProfile}>
            {user?.photoURL ? (
              <Image
                src={user.photoURL}
                alt={user?.displayName || "Profile Picture"}
                width={40}
                height={40}
                className={styles.profileImage}
              />
            ) : (
              <div className={styles.profilePlaceholder}>
                <User size={20} />
              </div>
            )}

            {isOpen && (
              <div className={styles.profileInfo}>
                <span className={styles.profileName}>
                  {user?.displayName || user?.email || "Admin"}
                </span>
                <span className={styles.profileRole}>
                  {user?.role || "User"}
                </span>
              </div>
            )}
          </div>
        </div>

        <ul className={styles.navbarMenu}>
          {navbar.map((item) => (
            <li key={item.id} className={styles.navbarItem}>
              {item.submenu ? (
                <>
                  <div
                    onClick={() => toggleSubmenu(item.id)}
                    className={clsx(
                      styles.navbarLink,
                      openSubmenu === item.id && styles.active,
                      item.submenu.some((sub) => sub.path === pathname) &&
                        styles.active
                    )}
                  >
                    <div className={styles.navbarIcon}>{item.icon}</div>
                    {isOpen && (
                      <div className={styles.submenu}>
                        <span className={styles.navbarName}>{item.name}</span>
                      </div>
                    )}
                    {isOpen && <ChevronDown size={20} />}
                  </div>

                  {openSubmenu === item.id && isOpen && (
                    <ul className={styles.navbarSubmenu}>
                      {item.submenu.map((subItem) => (
                        <li
                          key={subItem.id}
                          className={styles.navbarSubmenuItem}
                        >
                          <Link
                            href={subItem.path}
                            className={clsx(
                              styles.navbarSubmenuLink,
                              pathname === subItem.path && styles.active
                            )}
                            onClick={handleLinkClick}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={item.path}
                  className={clsx(
                    styles.navbarLink,
                    pathname === item.path && styles.active
                  )}
                  onClick={handleLinkClick}
                >
                  <span className={styles.navbarIcon}>{item.icon}</span>
                  {isOpen && (
                    <span className={styles.navbarName}>{item.name}</span>
                  )}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <button
          className={clsx(styles.navbarToggle, isOpen && styles.rotate)}
          onClick={toggleSidebar}
        >
          {window.innerWidth <= 768 ? (
            isOpen ? (
              <X size={20} />
            ) : (
              <ChevronsRight size={20} />
            )
          ) : (
            <ChevronsRight size={20} />
          )}
        </button>

        <div className={styles.navbarActions}>
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
