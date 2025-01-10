import styles from "@/app/admins/dashboard/users/user.module.scss";

export default function UserToolbar({ onAddClick }) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.heading}>
        <h1>Users</h1>
        <div className={styles.search}>
          <input type="text" placeholder="Search users" />
        </div>
      </div>

      <div className={styles.add__users}>
        <button onClick={onAddClick}>Add User</button>
      </div>
    </div>
  );
}
