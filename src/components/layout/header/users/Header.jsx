"use client";

import React from "react";

import { getAuth, signOut } from "firebase/auth";

import { LogOut, Search, Menu } from "lucide-react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/utils/auth/AuthContext";

import styles from "@/app/users/layout.module.scss";

export default function Header({ toggleSidebar }) {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className={styles.adminHeader}>
      <div className={styles.adminHeaderContainer}>
        <button className={styles.mobileMenu} onClick={toggleSidebar}>
          <Menu size={24} />
        </button>

        <div className={styles.searchBox}>
          <Search size={20} />
          <input type="text" placeholder="Search..." />
        </div>

        <div className={styles.headerActions}>
          <button className={styles.logoutButton} onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
