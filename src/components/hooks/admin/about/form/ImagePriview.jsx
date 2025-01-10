import Image from "next/image";

import styles from "@/components/hooks/admin/about/about.module.scss";

export const ImagePreview = ({ currentImageUrl, previewUrl }) => {
  if (!currentImageUrl && !previewUrl) return null;

  return (
    <div className={styles.imagePreview}>
      <span className={styles.imagePreview__label}>Image Preview:</span>

      <Image
        src={previewUrl || currentImageUrl}
        alt="Preview"
        width={300}
        height={300}
        className={styles.imagePreview__image}
      />
    </div>
  );
};
