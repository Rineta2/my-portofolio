import gsap from "gsap";

export function animateImages(imageRefs) {
  imageRefs.current.forEach((image, index) => {
    if (image) {
      gsap.fromTo(
        image,
        {
          y: 50,
          opacity: 0,
          scale: 0.8,
          rotation: -5,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.75)",
          scrollTrigger: {
            trigger: image,
            start: "top bottom-=150",
            toggleActions: "play none none none",
            once: true,
          },
          delay: index * 0.08,
        }
      );
    }
  });
}
