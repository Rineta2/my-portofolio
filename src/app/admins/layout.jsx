"use client";
import { useAuth } from "@/utils/auth/AuthContext";

import { useRouter } from "next/navigation";

import { Fragment, useEffect, useState } from "react";

import Navbar from "@/components/layout/header/admin/Navbar";

import Header from "@/components/layout/header/admin/Header";

import styles from "@/app/admins/layout.module.scss";

export default function AdminLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sidebarOpen");
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      const newState = !prev;
      localStorage.setItem("sidebarOpen", JSON.stringify(newState));
      return newState;
    });
  };

  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !user.isAdmin) {
    return null;
  }

  return (
    <Fragment>
      <div className={styles.admin}>
        <div
          className={`${styles.sidebar} ${
            isSidebarOpen ? styles.open : styles.close
          }`}
        >
          <Header toggleSidebar={toggleSidebar} />
          <Navbar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        </div>

        <div className={styles.aside}>{children}</div>
      </div>
    </Fragment>
  );
}
