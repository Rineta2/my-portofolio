"use client";
import { useAuth } from "@/utils/auth/AuthContext";

import { useRouter } from "next/navigation";

import { Fragment, useEffect, useState } from "react";

import styles from "@/app/users/layout.module.scss";

import { Toaster } from "react-hot-toast";

import Navbar from "@/components/layout/header/users/Navbar";

import Header from "@/components/layout/header/users/Header";

export default function UsersLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!loading && (!user || !user.isUser)) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (!user || !user.isUser) {
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
