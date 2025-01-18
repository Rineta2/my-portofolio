import Image from "next/image";

import Link from "next/link";

import styles from "@/app/articles/Articles.module.scss";

import notfound from "@/components/assets/priview/notfound.gif";

export default function NotFoundArticle() {
  return (
    <section className={styles.article__notfound}>
      <div className={`${styles.article__container} ${styles.container}`}>
        <div className={styles.content}>
          <div className={styles.img}>
            <Image src={notfound} alt="Article not found" />
          </div>
          <div className={styles.text}>
            <h1 className={styles.article__title}>Artikel tidak ditemukan</h1>
            <p>Artikel yang Anda cari tidak ditemukan.</p>
            <Link href="/articles" className={styles.button}>
              Kembali ke artikel
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
