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
    const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("userSidebarOpen");
            return saved ? JSON.parse(saved) : false;
        }
        return false;
    });

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => {
            const newState = !prev;
            localStorage.setItem("userSidebarOpen", JSON.stringify(newState));
            return newState;
        });
    };

    useEffect(() => {
        if (!loading && !user) {
            router.push("/");
        }
    }, [user, loading, router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return null;
    }

    return (
        <Fragment>
            <Toaster />
            <div className={styles.users}>
                <div
                    className={`${styles.sidebar} ${isSidebarOpen ? styles.open : styles.close}`}
                >
                    <Header toggleSidebar={toggleSidebar} />
                    <Navbar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                </div>
                <div className={styles.aside}>{children}</div>
            </div>
        </Fragment>
    );
}
