export const cardAnimation = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
};

export const imageAnimation = {
  initial: { scale: 0.8, opacity: 0 },
  whileInView: { scale: 1, opacity: 1 },
  viewport: { once: true },
};

export const textAnimation = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export const iconAnimation = {
  initial: { scale: 0, opacity: 0 },
  whileInView: { scale: 1, opacity: 1 },
  viewport: { once: true },
};

export const getTransition = (index, delay = 0) => ({
  duration: 0.5,
  delay: index * 0.2 + delay,
  ease: "easeOut",
});
