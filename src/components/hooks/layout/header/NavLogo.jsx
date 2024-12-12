import Link from "next/link";
import { logoName } from "@/components/data/Header";
import styles from "@/components/layout/header/header.module.scss";

export default function NavLogo() {
    return (
        <div className={styles.nav__logo}>
            {logoName.map((item, index) => (
                <Link href={item.path} key={index}>
                    {item.name}
                </Link>
            ))}
        </div>
    );
}