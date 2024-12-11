import React from "react";

import styles from "@/components/section/about/about.module.scss";

import { getAbout } from "@/utils/lib/about/read_server";

import Image from "next/image";

export default async function About() {
  const about = await getAbout();

  if (!about) {
    return (
      <section>
        <div className={`${styles.about__container} ${styles.container}`}>
          <h1>Halaman Tidak Ditemukan</h1>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className={`${styles.about__container} ${styles.container}`}>
        {about?.map((item, index) => (
          <div key={index}>
            <div className="img">
              <Image src={item?.imageUrl} alt={item?.title} width={500} height={500} />
            </div>
            <h1>{item?.title}</h1>
            <p>{item?.description}</p>
            <p>{item?.description2}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
