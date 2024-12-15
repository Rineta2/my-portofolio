import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { useIcons } from '@/components/hooks/admin/project/techstack/utils/useIcons';
import toast from 'react-hot-toast';
import styles from '@/app/admins/layout.module.scss';
import Image from 'next/image';

export default function IconForm() {
    const { addIcon } = useIcons();
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            // Buat URL preview
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            toast.error('Pilih file icon terlebih dahulu!');
            return;
        }

        // Validasi tipe file
        const validTypes = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'];
        if (!validTypes.includes(selectedFile.type)) {
            toast.error('Format file tidak didukung! Gunakan PNG, JPEG, atau SVG');
            return;
        }

        try {
            // Konfigurasi kompresi
            const options = {
                maxSizeMB: 1, // maksimal ukuran file 1MB
                maxWidthOrHeight: 1920, // maksimal lebar atau tinggi 1920px
                useWebWorker: true
            };

            const fileToUpload = selectedFile.type === 'image/svg+xml' 
                ? selectedFile 
                : await imageCompression(selectedFile, options);

            const success = await addIcon(fileToUpload);
            if (success) {
                setSelectedFile(null);
                setPreview(null);
                e.target.reset();
            }
        } catch (error) {
            console.error('Error compressing image:', error);
            toast.error('Gagal mengkompresi gambar');
        }
    };

    // Cleanup preview URL when component unmounts or when preview changes
    React.useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    return (
        <form onSubmit={handleSubmit} className={styles.techStack__form}>
            <div className={styles.form__group}>
                {preview && (
                    <div className={styles.preview}>
                        <Image 
                            src={preview} 
                            alt="Preview" 
                            width={100}
                            height={100}
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                )}
                
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={styles.input}
                />

                <button
                    type="submit"
                    className={styles.button}
                >
                    {preview ? "Simpan" : "Tambah Icon"}
                </button>
            </div>
        </form>
    );
}