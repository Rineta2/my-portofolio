import React from "react";

import Image from "next/image";

import styles from "@/components/hooks/section/youtube/youtube.module.scss";

export default function YoutubeContent({ videos }) {

    return <section className={styles.youtube}>
        <div className={`${styles.youtube__container} container`}>
            <div className={styles.content}>
                {
                    videos.map((item, index) => {
                        return (
                            <div key={index} className={styles.box}>
                                <div className={styles.box__img}>
                                    <Image src={item.thumbnail} alt={item.title} width={500} height={500} quality={100} priority={true} />
                                </div>

                                <div className={styles.box__info}>
                                    <h1>{item.title}</h1>
                                    <div className={styles.box__icons}>
                                        {
                                            item.icons.map((icon, i) => (
                                                <Image
                                                    key={`${icon}-${i}`}
                                                    src={icon}
                                                    alt={`icon-${i}`}
                                                    className={styles.iconImage}
                                                    width={24}
                                                    height={24}
                                                />
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </section>;
}