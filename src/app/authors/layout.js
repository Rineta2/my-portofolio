"use client";
import { useAuth } from "@/utils/auth/AuthContext";

import { useRouter } from "next/navigation";

import { Fragment, useEffect } from "react";

import { Toaster } from "react-hot-toast";

import styles from "@/app/authors/author.module.scss";

export default function AuthorLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !user.isAuthor)) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (!user || !user.isAuthor) {
    return null;
  }

  return (
    <Fragment>
      <Toaster />
      <div className={styles.author}>
        <aside className={styles.content}>{children}</aside>
      </div>
    </Fragment>
  );
}
