import { User } from "lucide-react";

import Image from "next/image";

import { useEffect, useRef } from "react";

import { format } from "date-fns";

import { initUserCardBackground } from "@/components/hooks/animation/admin/users/UserCardBackground";

import styles from "@/components/hooks/admin/users/user.module.scss";

import { auth, db } from "@/utils/firebase";

import { doc, updateDoc } from "firebase/firestore";

import { toast } from "react-hot-toast";

export default function UserCard({ user, onDeleteClick }) {
  const bgRef = useRef(null);

  useEffect(() => {
    const element = bgRef.current;
    const cleanup = initUserCardBackground(element);
    return cleanup;
  }, []);

  const handleToggleAccount = async (userId, isDisabled) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        disabled: !isDisabled,
        lastUpdatedBy: auth.currentUser.uid,
        lastUpdatedAt: new Date().toISOString(),
        accountStatus: !isDisabled ? "disabled" : "active",
        disabledAt: !isDisabled ? new Date().toISOString() : null,
      });

      toast.success(
        isDisabled ? "Akun berhasil diaktifkan" : "Akun berhasil dinonaktifkan"
      );
    } catch (error) {
      toast.error("Gagal mengubah status akun: " + error.message);
    }
  };

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
              <User />
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
            <span>{label}:</span> {value}
          </p>
        ))}
      </div>

      <div className={styles.user__card__actions}>
        <button onClick={() => onDeleteClick(user)}>Delete</button>

        <button
          onClick={() => handleToggleAccount(user.id, user.disabled)}
          className={`${styles.toggleBtn} ${
            user.disabled ? styles.enable : styles.disable
          }`}
        >
          {user.disabled ? "Enable Account" : "Disable Account"}
        </button>
      </div>
    </div>
  );
}
