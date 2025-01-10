import { User } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { format } from "date-fns";

import { initUserCardBackground } from "@/components/hooks/animation/admin/users/UserCardBackground";

import styles from "@/app/admins/dashboard/users/user.module.scss";

export default function UserCard({ user, onDeleteClick }) {
  const bgRef = useRef(null);

  useEffect(() => {
    const element = bgRef.current;
    const cleanup = initUserCardBackground(element);
    return cleanup;
  }, []);

  return (
    <div className={styles.user__card}>
      <div className={styles.user__header}>
        <div className={styles.img}>
          {user.photoURL ? (
            <Image
              src={user.photoURL}
              alt={user.displayName || "User"}
              width={500}
              height={500}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : (
            <div className={styles.user__card__header__left__image}>
              <User className="w-8 h-8 text-gray-500 dark:text-gray-400" />
            </div>
          )}
        </div>

        <div className={styles.info}>
          <h3>{user.displayName || "Unnamed User"}</h3>
          <span className={styles.info__email}>{user.email}</span>
        </div>

        <div className={styles.bg} ref={bgRef}></div>
      </div>

      <div className={styles.user__card__details}>
        {Object.entries({
          "Display Name": user.displayName,
          Phone: user.phoneNumber,
          Role: user.role,
          "Email Verified": user.emailVerified ? "Yes" : "No",
          Created: format(new Date(user.createdAt), "dd - MMMM - yyyy"),
          Updated: format(new Date(user.updatedAt), "dd - MMMM - yyyy"),
        }).map(([label, value]) => (
          <p key={label}>
            <span className="font-semibold">{label}:</span> {value}
          </p>
        ))}
      </div>

      <button onClick={() => onDeleteClick(user)}>Delete</button>
    </div>
  );
}
