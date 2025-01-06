"use client";

import React from "react";

import { Search, Menu, User } from "lucide-react";

import { useAuth } from "@/utils/auth/AuthContext";

import styles from "@/app/admins/layout.module.scss";

import Image from "next/image";

import { useTheme } from "@/utils/theme/ThemeContext";

import clsx from "clsx";

export default function Header({ toggleSidebar }) {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();

  return (
    <header
      className={clsx(styles.header, isDarkMode ? styles.dark : styles.light)}
    >
      <div className={`${styles.adminHeaderContainer} container`}>
        <div className={styles.profile}>
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

          <div className={styles.profileInfo}>
            <span className={styles.profileName}>
              {user?.displayName || user?.email || "Admin"}
            </span>
            <span className={styles.profileRole}>{user?.role || "User"}</span>
          </div>
        </div>

        <div className={styles.navActions}>
          <div className={styles.searchBox}>
            <Search size={20} />
            <input type="text" placeholder="Search..." />
          </div>

          <button className={styles.mobileMenu} onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
