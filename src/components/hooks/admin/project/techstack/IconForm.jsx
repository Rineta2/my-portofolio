import React, { useState } from 'react';

import { useIcons } from '@/components/hooks/admin/project/techstack/utils/useIcons';

import { iconLibraries } from '@/components/hooks/admin/project/techstack/DynamicIcons';

import toast from 'react-hot-toast';

import styles from '@/app/admins/layout.module.scss';

export default function IconForm() {
    const { addIcon } = useIcons();
    const [newIcon, setNewIcon] = useState({ name: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newIcon.name) {
            toast.error('Nama icon tidak boleh kosong!');
            return;
        }

        const iconExists = Object.values(iconLibraries).some(lib => lib[newIcon.name]);
        if (!iconExists) {
            toast.error(`Icon "${newIcon.name}" tidak ditemukan! Pastikan menggunakan format yang benar`);
            return;
        }

        const success = await addIcon(newIcon);
        if (success) {
            setNewIcon({ name: '' });
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.techStack__form}>
            <div className={styles.form__group}>
                <input
                    type="text"
                    placeholder="Nama Icon (contoh: FaReact, RiNextjsFill, SiJavascript)"
                    value={newIcon.name}
                    onChange={(e) => setNewIcon({ ...newIcon, name: e.target.value })}
                    className={styles.input}
                />

                <button
                    type="submit"
                    className={styles.button}
                >
                    Tambah Icon
                </button>
            </div>
        </form>
    );
}