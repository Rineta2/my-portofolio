import { User } from "lucide-react";

import Image from "next/image";

import styles from "@/components/hooks/admin/users/user.module.scss";

export default function DeleteUserModal({
  showModal,
  user,
  onClose,
  onDelete,
}) {
  if (!showModal || !user) return null;

  return (
    <div className={styles.delete__user__modal}>
      <div className={styles.delete__user__modal__content}>
        <h2>Hapus User</h2>

        <div className={styles.box}>
          <div className={styles.profile}>
            <div className={styles.img}>
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  width={500}
                  height={500}
                />
              ) : (
                <User />
              )}
            </div>

            <div className={styles.info}>
              <h3>{user.displayName || "Unnamed User"}</h3>
              <span>{user.email}</span>
            </div>
          </div>

          <p>Apakah anda yakin ingin menghapus user ini?</p>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={onClose}
            className={`${styles.button} ${styles.button_secondary}`}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onDelete(user.id)}
            className={styles.delete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
