import React from 'react';

import ProfileImage from '@/components/hooks/admin/settings/ProfileImage';

import { useProfile } from '@/components/hooks/admin/settings/utils/useProfile';

import Toast from '@/components/hooks/admin/settings/Toast';

import styles from '@/app/admins/layout.module.scss';

export default function ProfileForm() {
    const {
        userData,
        loading,
        handleChange,
        handleSubmit
    } = useProfile();

    return (
        <section className={styles.settings}>
            <Toast />
            <div className={`${styles.settingsContainer} ${styles.container}`}>
                <h2 className={styles.settingsTitle}>Pengaturan Profil</h2>

                <form onSubmit={handleSubmit} className={styles.settingsForm}>
                    <div className={styles.settingsItem}>
                        <label className={styles.settingsLabel}>Nama</label>
                        <input
                            type="text"
                            name="displayName"
                            value={userData.displayName}
                            onChange={handleChange}
                            className={styles.settingsInput}
                        />
                    </div>

                    <div className={styles.settingsItem}>
                        <label className={styles.settingsLabel}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            readOnly
                            className={styles.settingsInput}
                        />
                    </div>

                    <div className={styles.settingsItem}>
                        <label className={styles.settingsLabel}>Telepon</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            readOnly
                            value={userData.phoneNumber}
                            onChange={handleChange}
                            className={styles.settingsInput}
                        />
                    </div>
                    <ProfileImage />
                    <button
                        type="submit"
                        disabled={loading}
                        className={styles.settingsButton}
                    >
                        {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>
                </form>
            </div>

        </section>
    );
}