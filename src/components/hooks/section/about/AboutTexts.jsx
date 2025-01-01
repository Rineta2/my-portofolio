import React from "react";

import styles from "@/components/section/about/about.module.scss";

import TextComponent from "@/components/hooks/animation/about/TextComponent";

import TextComponentSecondary from "@/components/hooks/animation/about/TextComponentSecondary";

import gsap from "gsap";

export function AboutTexts({ about, titleRefs }) {
  return (
    <>
      {about?.map((text, index) => (
        <div key={index} className={styles.text}>
          <h1 ref={(el) => (titleRefs.current[index] = el)}>{text?.title}</h1>
          <TextComponent
            desc={text?.description}
            onComplete={() => {
              if (titleRefs.current[index + 1]) {
                gsap.to(titleRefs.current[index + 1], {
                  opacity: 1,
                  duration: 1,
                });
              }
            }}
          />
          {text?.description2 && (
            <div style={{ marginTop: "20px" }}>
              <TextComponentSecondary desc={text?.description2} />
            </div>
          )}
        </div>
      ))}
    </>
  );
}