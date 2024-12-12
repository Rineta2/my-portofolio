import Image from "next/image";

import { User, Menu, ArrowUpRight } from "lucide-react";

import styles from "@/components/layout/header/header.module.scss";

const imageKitLoader = ({ src, width, quality }) => {
    if (src[0] === '/') return src
    const params = [`w-${width}`]
    if (quality) {
        params.push(`q-${quality}`)
    }
    return `${src}?tr=${params.join(',')}`
}

export default function NavActions({ user, setIsModalOpen, setShowProfileMenu, showProfileMenu, toggleMenu }) {
    return (
        <div className={styles.nav__actions}>
            {user ? (
                <div
                    className={styles.profileTrigger}
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                    {user?.photoURL ? (
                        <Image
                            loader={imageKitLoader}
                            src={user.photoURL}
                            alt={`Profile picture of ${user.displayName || user.email}`}
                            width={50}
                            height={50}
                            className={styles.profileImage}
                            style={{ objectFit: 'cover', borderRadius: '50%', border: '2px solid #e8e8e8' }}
                            onError={(e) => {
                                e.target.src = '/default-avatar.png';
                            }}
                            unoptimized
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