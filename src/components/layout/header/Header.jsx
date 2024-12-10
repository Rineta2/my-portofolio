"use client";

import React, { useEffect, useState } from "react";

import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import Link from "next/link";

import Image from "next/image";

import { usePathname } from "next/navigation";

import {
  ArrowUpRight,
  CircleEllipsis,
  User,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import { useAuth } from "@/utils/auth/AuthContext";
import AuthModal from "@/components/layout/header/auth/AuthModal";
import Cookies from "js-cookie";
import styles from "@/components/layout/header/header.module.scss";
import { logoName, navLink } from "@/components/data/Header";

import { Toaster } from "react-hot-toast";

export default function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    initializeGSAPAnimations();
  }, []);

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    if (authToken && !user) {
      // If there's a token but no user, remove the tokens
      Cookies.remove("authToken");
      Cookies.remove("refreshToken");
    }
  }, [user]);

  const initializeGSAPAnimations = () => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to("header", {
      scrollTrigger: {
        trigger: "header",
        start: "top top",
        endTrigger: "html",
        end: "bottom top",
        toggleClass: {
          className: styles.sticky,
          targets: "header",
        },
      },
    });

    gsap.fromTo(
      "header",
      {
        backgroundColor: "transparent",
        backdropFilter: "blur(0px)",
      },
      {
        backgroundColor: "rgba(0, 0, 0, 0.181)",
        backdropFilter: "blur(10px)",
        scrollTrigger: {
          trigger: "header",
          start: "center center",
          end: "+=50",
          scrub: true,
        },
      }
    );
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setShowProfileMenu(false);
    }
  };

  const renderLogo = () =>
    logoName.map((item, index) => (
      <Link href={item.path} key={index} className={styles.nav__logo}>
        {item.name}
      </Link>
    ));

  const renderNavLinks = () => (
    <ul className={styles.nav__list}>
      {navLink.map((item) => (
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
      ))}
    </ul>
  );

  const renderProfileMenu = () => (
    <div className="profile-menu">
      <div
        className="profile-info"
        style={{
          borderBottom: "1px solid #eee",
          paddingBottom: "0.5rem",
          marginBottom: "0.5rem",
        }}
      >
        <h1>{user.displayName || user.email}</h1>
      </div>

      <Link
        href={user.isAdmin ? "/admins/dashboard" : "/users/dashboard"}
        className="dashboard-link"
        onClick={() => setShowProfileMenu(false)}
      >
        <LayoutDashboard size={24} /> Dashboard
      </Link>

      <div
        className="logout-button"
        onClick={handleLogout}
        style={{ cursor: "pointer" }}
      >
        <LogOut size={16} />
        <span>Logout</span>
      </div>
    </div>
  );

  const renderAuthButton = () => (
    <div className={styles.nav__button}>
      {user ? (
        <div className="profile-container" style={{ position: "relative" }}>
          <div
            className="profile-trigger"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
            }}
          >
            {user.photoURL ? (
              <Image
                src={user.photoURL}
                alt="Profile"
                width={500}
                height={500}
                className="profile-image"
              />
            ) : (
              <User size={24} />
            )}
          </div>
          {showProfileMenu && renderProfileMenu()}
        </div>
      ) : (
        <div
          className="login"
          onClick={() => setIsModalOpen(true)}
          style={{ cursor: "pointer" }}
        >
          Login
          <ArrowUpRight className="arrow" />
        </div>
      )}
    </div>
  );

  return (
    <>
      <Toaster />
      <header className={styles.header}>
        <nav className={`${styles.nav} ${styles.container}`}>
          {renderLogo()}
          {renderNavLinks()}
          {renderAuthButton()}
          <button className={styles.hamburger}>
            <CircleEllipsis size={40} />
          </button>
        </nav>
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
