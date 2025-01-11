export const containerVariants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export const projectCardVariants = (index) => ({
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: index * 0.15,
      ease: "easeOut",
    },
  },
});

export const backgroundVariants = {
  left: {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 0.3 },
    transition: {
      duration: 1.2,
      ease: "easeOut",
    },
  },
  right: {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 0.3 },
    transition: {
      duration: 1.2,
      ease: "easeOut",
    },
  },
};

export const viewportConfig = {
  once: true,
  amount: "some",
  margin: "-100px 0px",
};

//=========== Top Project Animation ============//

export const containerAnimation = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
};

export const textContainerAnimation = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, delay: 0.2, ease: "easeOut" },
};

export const titleAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: 0.3 },
};

export const dateAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: 0.4 },
};

export const descriptionAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: 0.5 },
};

export const toolbarAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: 0.6 },
};

export const imageAnimation = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.8, delay: 0.3 },
};

export const viewportConfigTopProject = {
  once: true,
  amount: 0.3,
};

//=========== Category Sidebar Animation ============//

export const sidebarAnimation = {
  initial: {
    opacity: 0,
    x: -50,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  transition: {
    duration: 0.8,
    ease: "easeOut",
  },
};

export const headingAnimation = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: 0.5,
    delay: 0.2,
    ease: "easeOut",
  },
};

export const buttonAnimation = (index) => ({
  initial: {
    opacity: 0,
    x: -20,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  transition: {
    duration: 0.5,
    delay: 0.3 + index * 0.1,
    ease: "easeOut",
  },
});

export const viewportConfigCategorySidebar = {
  once: true,
  amount: 0.3,
};

//=========== Project Card Animation ============//

export const cardAnimation = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: 0.6,
    ease: "easeOut",
  },
};

export const imageCardAnimation = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  transition: {
    duration: 0.6,
    ease: "easeOut",
  },
};

export const toolbarCardAnimation = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: 0.5,
    delay: 0.2,
    ease: "easeOut",
  },
};

export const viewportConfigProjectCard = {
  once: true,
  amount: 0.3,
};
