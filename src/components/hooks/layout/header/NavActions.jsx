import Image from "next/image";
import { User, Menu, ArrowUpRight } from "lucide-react";
import styles from "@/components/layout/header/header.module.scss";

export default function NavActions({ user, setIsModalOpen, setShowProfileMenu, showProfileMenu, toggleMenu }) {
    return (
        <div className={styles.nav__actions}>
            {user ? (
                <div
                    className={styles.profileTrigger}
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                    {user.photoURL ? (
                        <Image
                            src={user.photoURL}
                            alt="Profile"
                            width={32}
                            height={32}
                            className={styles.profileImage}
                        />
                    ) : (
                        <User size={24} />
                    )}
                </div>
            ) : (
                <div
                    className={styles.login}
                    onClick={() => setIsModalOpen(true)}
                >
                    Login
                    <ArrowUpRight className={styles.arrow} />
                </div>
            )}

            <div className={styles.hamburger} onClick={toggleMenu}>
                <Menu />
            </div>
        </div>
    );
}