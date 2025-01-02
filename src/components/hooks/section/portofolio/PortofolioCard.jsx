import Image from "next/image";

import styles from "@/components/section/portofolio/portofolio.module.scss";

export default function ProjectCard({ item, ref }) {
  return (
    <div ref={ref} className={styles.box}>
      <div className={styles.img}>
        <Image
          src={item.thumbnail}
          alt={item.title}
          width={500}
          height={500}
          quality={100}
        />
      </div>

      <div className={styles.text}>
        <h2 className={styles.title}>{item.title}</h2>
        <p className={styles.description}>{item.description}</p>

        <div className={styles.category}>
          <span className={styles.category__title}>Category</span>
          <span className={styles.category__item}>{item.category}</span>
        </div>

        <div className={styles.teknologo}>
          <span className={styles.teknologo__title}>Technology</span>
          <div className={styles.teknologo__item}>
            {item.icons.map((icon, index) => (
              <div className={styles.img} key={index}>
                <Image
                  src={icon}
                  alt={icon}
                  width={500}
                  height={500}
                  quality={100}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
