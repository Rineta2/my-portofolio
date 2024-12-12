import React from 'react';

import Image from 'next/image';

import { useProfile } from '@/components/hooks/admin/settings/utils/useProfile';

import styles from '@/app/admins/layout.module.scss';

export default function ProfileImage() {
    const { userData, handleFileChange } = useProfile();

    return (
        <div className={styles.settingsItem}>
            <label className={styles.settingsLabel}>Foto Profil</label>

            {userData.photoURL && (
                <Image
                    width={100}
                    height={100}
                    src={userData.photoURL}
                    alt="Profile"
                    className={styles.profileImage}
                />
            )}

            <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className={styles.settingsInput}
            />


        </div>
    );
}