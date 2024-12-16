import React, { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import Image from "next/image";

import styles from "@/app/portofolio/Portofolio.module.scss";

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

export default function PortoSwipper({ project, thumbsSwiper, setThumbsSwiper }) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className={styles.priview}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
                {
                    project.projectImages && project.projectImages.map((image, index) => (
                        <SwiperSlide key={index} className={styles.swiperSlide}>
                            <div className={styles.img}>
                                <Image src={image} alt={project.title} width={500} height={500} quality={100} />
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className={styles.mySwiper}
            >
                {
                    project.projectImages && project.projectImages.map((image, index) => (
                        <SwiperSlide
                            key={index}
                            className={`${styles.swiperSlide} ${index === activeIndex ? styles.active : ''}`}
                        >
                            <Image src={image} alt={project.title} width={500} height={500} quality={100} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </>
    );
}