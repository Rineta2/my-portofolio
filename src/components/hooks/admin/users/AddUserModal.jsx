import styles from "@/components/hooks/admin/users/user.module.scss";

export default function AddUserModal({
  showModal,
  onClose,
  onSubmit,
  newUser = {
    email: "",
    password: "",
    displayName: "",
    phoneNumber: "",
    role: "users",
  },
  setNewUser,
  error,
}) {
  if (!showModal) return null;

  const handleChange = (field) => (e) => {
    setNewUser((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <div className={styles.add__user__modal}>
      <div className={styles.add__user__modal__content}>
        <h2>Tambah User Baru</h2>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={onSubmit}>
          <div className={styles.form__group}>
            <div className={styles.form__group__item}>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                value={newUser?.email || ""}
                onChange={handleChange("email")}
                required
                className={styles.input}
                placeholder="Enter email address"
              />
            </div>

            <div className={styles.form__group__item}>
              <label className="block mb-1">Password</label>
              <input
                type="password"
                value={newUser?.password || ""}
                onChange={handleChange("password")}
                required
                minLength={6}
                className={styles.input}
                placeholder="Enter password (min. 6 characters)"
              />
            </div>
          </div>

          <div className={styles.form__group}>
            <div className={styles.form__group__item}>
              <label className="block mb-1">Display Name</label>
              <input
                type="text"
                value={newUser?.displayName || ""}
                onChange={handleChange("displayName")}
                required
                className={styles.input}
                placeholder="Enter display name"
              />
            </div>

            <div className={styles.form__group__item}>
              <label className="block mb-1">Phone Number</label>
              <input
                type="tel"
                value={newUser?.phoneNumber || ""}
                onChange={handleChange("phoneNumber")}
                className={styles.input}
                placeholder="Enter phone number (optional)"
              />
            </div>
          </div>

          <div className={styles.form__single}>
            <div className={styles.form__group__item}>
              <label className="block mb-1">Role</label>

              <select
                value={newUser?.role || "users"}
                onChange={handleChange("role")}
                required
                className={styles.select}
              >
                <option value="users">Users</option>
                <option value="authors">Authors</option>
              </select>
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancel}>
              Cancel
            </button>

            <button type="submit" className={styles.add}>
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
