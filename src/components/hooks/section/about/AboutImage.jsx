import React from "react";

import Image from "next/image";

import styles from "@/components/section/about/about.module.scss";

export function AboutImages({ about, imageRefs }) {
  return (
    <>
      {about?.map((image, index) => (
        <div
          key={index}
          className={styles.img}
          ref={(el) => (imageRefs.current[index] = el)}
        >
          <Image
            src={image?.imageUrl}
            style={{ cursor: "pointer" }}
            alt={image?.title}
            width={500}
            height={500}
          />
        </div>
      ))}
    </>
  );
}
