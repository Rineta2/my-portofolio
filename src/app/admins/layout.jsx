"use client";
import { useAuth } from "@/utils/auth/AuthContext";

import { useRouter } from "next/navigation";

import { Fragment, useEffect } from "react";

import Navbar from "@/components/layout/header/admin/Navbar";

import styles from "@/app/admins/layout.module.scss";

import { Toaster } from "react-hot-toast";

export default function AdminLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

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
        <Navbar />
        <aside>{children}</aside>
      </div>
    </Fragment>
  );
}
