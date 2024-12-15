import React from 'react';

import { useIcons } from '@/components/hooks/admin/project/techstack/utils/useIcons';

import Image from 'next/image';

import styles from '@/app/admins/layout.module.scss';

export default function IconGrid() {
    const { icons, deleteIcon } = useIcons();

    return (
        <>
            <div className={styles.tollbar}>
                <h1>Tech Stack</h1>
            </div>

            <div className={styles.content}>
                {icons.map(icon => (
                    <div key={icon.id} className={styles.iconItem}>
                        <Image 
                            src={icon.url}
                            alt="Tech Stack Icon"
                            width={500}
                            height={500}
                            style={{ objectFit: "contain" }}
                        />
                        <button
                            onClick={() => deleteIcon(icon.id)}
                            className={styles.button}
                        >
                            Hapus
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}