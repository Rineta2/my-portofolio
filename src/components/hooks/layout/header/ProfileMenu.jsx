import Link from "next/link";

import { LayoutDashboard, LogOut, X } from "lucide-react";

import styles from "@/components/layout/header/header.module.scss";

export default function ProfileMenu({ user, logout, setShowProfileMenu }) {
  if (!user) return null;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setShowProfileMenu(false);
    }
  };

  return (
    <div className={styles.headerProfileMenu}>
      <div className={styles.profileInfo}>
        <span className={styles.name}>
          {user.displayName || "User" || "Authors"}
        </span>
      </div>

      <Link
        href={`/${user.role}/dashboard`}
        className={styles.dashboardLink}
        onClick={() => setShowProfileMenu(false)}
      >
        <LayoutDashboard size={24} /> Dashboard
      </Link>

      <div className={styles.logoutButton} onClick={handleLogout}>
        <LogOut size={16} />
        <span>Logout</span>
      </div>

      <div
        className={styles.closeButton}
        onClick={() => setShowProfileMenu(false)}
      >
        <X size={24} />
      </div>
    </div>
  );
}
