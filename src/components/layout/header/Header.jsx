"use client";

import React, { useState, useEffect } from "react";

import { usePathname } from "next/navigation";

import { useAuth } from "@/utils/auth/AuthContext";

import styles from "@/components/layout/header/header.module.scss";

import NavLogo from "@/components/hooks/layout/header/NavLogo";

import NavList from "@/components/hooks/layout/header/NavList";

import NavActions from "@/components/hooks/layout/header/NavActions";

import ProfileMenu from "@/components/hooks/layout/header/ProfileMenu";

import AuthModal from "@/components/layout/header/auth/AuthModal";

import useHeaderScroll from "@/components/hooks/animation/header/useHeaderScroll";

import useModalEffects from "@/components/tools/useModalEffect";

export default function Header() {
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const pathname = usePathname();

  useHeaderScroll(pathname);
  useModalEffects(showHamburgerMenu);
  useModalEffects(showProfileMenu);
  useModalEffects(isModalOpen);

  const toggleMenu = () => {
    setShowHamburgerMenu(!showHamburgerMenu);
    document.body.style.overflow = !showHamburgerMenu ? 'hidden' : 'unset';
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      <header className={`${styles.header} ${showHamburgerMenu ? styles.menuOpen : ''}`}>
        <nav className={`${styles.nav} ${styles.container}`}>
          <NavLogo />
          <NavList
            pathname={pathname}
            showHamburgerMenu={showHamburgerMenu}
            toggleMenu={toggleMenu}
          />
          <NavActions
            user={user}
            setIsModalOpen={setIsModalOpen}
            setShowProfileMenu={setShowProfileMenu}
            showProfileMenu={showProfileMenu}
            toggleMenu={toggleMenu}
            showHamburgerMenu={showHamburgerMenu}
          />
        </nav>

        {showProfileMenu && (
          <ProfileMenu
            user={user}
            logout={logout}
            setShowProfileMenu={setShowProfileMenu}
          />
        )}
      </header>

      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </>
  );
}
