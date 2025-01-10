"use client";

import React, { useState, useEffect, useCallback } from "react";

import Link from "next/link";

import styles from "@/components/layout/header/header.module.scss";

import { logoName, navLink } from "@/components/data/Header";

import { SunMoon, CloudMoon, User } from "lucide-react";

import { usePathname } from "next/navigation";

import AuthModal from "@/components/layout/header/auth/AuthModal";

import { useAuth } from "@/utils/auth/AuthContext";

import ProfileMenu from "@/components/hooks/layout/header/ProfileMenu";

import Image from "next/image";

import { useTheme } from "@/utils/theme/ThemeContext";

export default function Testing() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [sticky, setSticky] = useState(false);
  const [scrollingUp, setScrollingUp] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  const { isDarkMode, toggleTheme } = useTheme();

  const handleScroll = useCallback(() => {
    const currentScroll = window.scrollY;
    const isScrollingUp = currentScroll < lastScroll;

    if (currentScroll > 100) {
      setSticky(true);
      setScrollingUp(isScrollingUp);
    } else {
      setSticky(false);
      setScrollingUp(false);
    }

    setLastScroll(currentScroll);
  }, [lastScroll]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <header
      className={`${styles.header} ${
        isDarkMode ? styles.header__dark : styles.header__light
      } container`}
    >
      <Link href={logoName.path} className={styles.nav__logo}>
        {logoName.name}
      </Link>

      <nav
        className={`${styles.nav} ${sticky ? styles.nav__sticky : ""} ${
          scrollingUp ? styles.nav__sticky_up : ""
        } container`}
      >
        <ul className={styles.nav__list}>
          {navLink.map((item, index) => (
            <li
              className={`${styles.nav__item} ${
                pathname === item.path ||
                (item.path === "/portofolio" &&
                  pathname.startsWith("/portofolio/")) ||
                (item.path === "/articles" && pathname.startsWith("/articles/"))
                  ? styles.nav__item__active
                  : ""
              }`}
              key={index}
            >
              <Link href={item.path}>
                <span className={styles.nav__item__icon}>{item.icon}</span>

                <span className={styles.nav__item__name}>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.nav__actions}>
        <div className={styles.nav__actions__dark} onClick={toggleTheme}>
          {isDarkMode ? <SunMoon /> : <CloudMoon />}
        </div>

        <div className={styles.nav__actions__menu}>
          {user ? (
            <div
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className={styles.profileMenu}
            >
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt={`Profile picture of ${user.displayName || user.email}`}
                  width={40}
                  height={40}
                  className={styles.profileImage}
                  style={{
                    objectFit: "cover",
                    borderRadius: "50%",
                    border: "2px solid #e8e8e8",
                  }}
                  onError={(e) => {
                    e.target.src = "/default-avatar.png";
                  }}
                  unoptimized
                />
              ) : (
                <div className={styles.defaultAvatar}>
                  <User size={24} />
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => setIsModalOpen(true)}>Login</button>
          )}
        </div>
      </div>

      {showProfileMenu && user && (
        <ProfileMenu
          user={user}
          logout={logout}
          setShowProfileMenu={setShowProfileMenu}
        />
      )}

      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </header>
  );
}
