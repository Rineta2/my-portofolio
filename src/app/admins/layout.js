"use client";
import { useAuth } from "@/utils/auth/AuthContext";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import Navbar from "@/components/layout/header/admin/Navbar";
import styles from "@/app/admins/layout.module.scss";
import { Toaster } from "react-hot-toast";
import Header from "@/components/layout/header/admin/Header";

export default function AdminLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (!user || !user.isAdmin) {
    return null;
  }

  return (
    <Fragment>
      <Toaster />
      <div className={styles.admin}>
        <div className={styles.sidebar}>
          <Header toggleSidebar={toggleSidebar} />
          <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        </div>
        <aside className={styles.content}>{children}</aside>
      </div>
    </Fragment>
  );
}
