"use client";

import React, { useState } from "react";

import { User } from "lucide-react";

import Image from "next/image";

import { useAuth } from "@/utils/auth/AuthContext";

import { navbar } from "@/components/data/Users";

import Link from "next/link";

import styles from "@/app/users/layout.module.scss";

import { usePathname } from "next/navigation";

export default function Navbar({ isOpen, setIsOpen }) {
  const { user } = useAuth();

  const [openSubmenu, setOpenSubmenu] = useState(null);

  const pathname = usePathname();

  const toggleSubmenu = (itemId) => {
    setOpenSubmenu(openSubmenu === itemId ? null : itemId);
  };

  const toggleSidebar = () => {
    const newState = !isOpen;
    localStorage.setItem("sidebarOpen", JSON.stringify(newState));
    setIsOpen(newState);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`${styles.navbar} ${isOpen ? styles.open : styles.close}`}>
      <div className={styles.navbarHeader}>
        <div className={styles.navbarProfile}>
          {user?.photoURL ? (
            <Image
              src={user.photoURL}
              alt="Profile"
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
              <span className={styles.profileEmail}>{user?.email}</span>
            </div>
          )}
        </div>
      </div>

      <button className={styles.navbarToggle} onClick={toggleSidebar}>
        {isOpen ? "←" : "→"}
      </button>

      <ul className={styles.navbarMenu}>
        {navbar.map((item) => (
          <li key={item.id} className={styles.navbarItem}>
            {item.submenu ? (
              <>
                <div
                  onClick={() => toggleSubmenu(item.id)}
                  className={`${styles.navbarLink} ${openSubmenu === item.id ? styles.active : ""
                    } ${item.submenu.some((sub) => sub.path === pathname)
                      ? styles.active
                      : ""
                    }`}
                >
                  <span className={styles.navbarIcon}>{item.icon}</span>
                  {isOpen && (
                    <span className={styles.navbarName}>{item.name}</span>
                  )}
                  {isOpen && <span className={styles.navbarArrow}>▼</span>}
                </div>

                {openSubmenu === item.id && isOpen && (
                  <ul className={styles.navbarSubmenu}>
                    {item.submenu.map((subItem) => (
                      <li key={subItem.id} className={styles.navbarSubmenuItem}>
                        <Link
                          href={subItem.path}
                          className={`${styles.navbarSubmenuLink} ${pathname === subItem.path ? styles.active : ""
                            }`}
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
                className={`${styles.navbarLink} ${pathname === item.path ? styles.active : ""
                  }`}
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
    </nav>
  );
}
