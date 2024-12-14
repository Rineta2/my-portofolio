import React, { useState } from 'react';

import { useIcons } from '@/components/hooks/admin/project/techstack/utils/useIcons';

import { DynamicIcon } from '@/components/hooks/admin/project/techstack/DynamicIcons';

import styles from '@/app/admins/layout.module.scss';

export default function IconGrid() {
    const { icons, deleteIcon } = useIcons();
    const [searchTerm, setSearchTerm] = useState('');

    // Filter icons based on search term
    const filteredIcons = icons.filter(icon =>
        icon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className={styles.tollbar}>
                <h1>Tech Stack</h1>

                <input
                    type="text"
                    placeholder="Cari icon..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
            </div>

            <div className={styles.content}>
                {filteredIcons.map(icon => (
                    <div key={icon.id} className={styles.iconItem}>
                        <DynamicIcon iconName={icon.name} />
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