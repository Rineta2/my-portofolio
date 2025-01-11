//============== Article Content ==============//

export const fadeInUpAnimation = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 50, opacity: 0 },
  transition: { duration: 0.5 },
};

//============== Article Top ==============//

export const containerAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
};

export const articleCardAnimation = (index) => ({
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { delay: index * 0.2, duration: 0.5 },
});

export const textContainerAnimation = (index) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.4 + index * 0.2, duration: 0.5 },
});

export const titleAnimationTopArticle = (index) => ({
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.7 + index * 0.2, duration: 0.5 },
});

export const descriptionAnimation = (index) => ({
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.8 + index * 0.2, duration: 0.5 },
});

export const categoryAnimationTopArticle = (index) => ({
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { delay: 0.5 + index * 0.2, duration: 0.5 },
});

export const authorAnimation = (index) => ({
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { delay: 0.6 + index * 0.2, duration: 0.5 },
});

export const imageAnimation = {
  whileHover: { scale: 1.05 },
  transition: { duration: 0.3 },
};

export const dateAnimation = (index) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.3 + index * 0.2, duration: 0.5 },
});

//============== Article Grid ==============//

export const gridItemAnimation = {
  initial: { opacity: 0, y: 50, scale: 0.9 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: {
    duration: 0.6,
    type: "spring",
    stiffness: 100,
  },
};

export const imageHoverAnimation = {
  whileHover: {
    scale: 1.05,
    rotate: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export const textAnimation = {
  initial: { opacity: 0, x: -20 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" },
};

export const bottomAnimation = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" },
};

export const categoryAnimation = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

//============== Article Toolbar ==============//

export const toolbarAnimation = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export const headingAnimation = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { delay: 0.2, duration: 0.5 },
};

export const titleAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { delay: 0.3, duration: 0.5 },
};

export const categoryContainerAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.4, duration: 0.5 },
};

export const categoryItemAnimation = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 },
};

//============== Search Modal ==============//

export const searchTitleAnimation = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { delay: 0.2, duration: 0.5 },
};

export const searchContainerAnimation = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { delay: 0.3, duration: 0.5 },
  whileHover: { scale: 1.02 },
};

export const searchIconAnimation = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  transition: { delay: 0.4, duration: 0.5 },
};

export const searchInputAnimation = {
  initial: { opacity: 0, x: 10 },
  animate: { opacity: 1, x: 0 },
  transition: { delay: 0.5, duration: 0.5 },
};

//============== Top Article In Category Page ==============//

export const containerAnimationCategory = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
};

export const articleCardAnimationCategory = (index) => ({
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { delay: index * 0.2, duration: 0.5 },
});

export const imageAnimationCategory = {
  whileHover: { scale: 1.05 },
  transition: { duration: 0.3 },
};

export const dateAnimationCategory = (index) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.3 + index * 0.2, duration: 0.5 },
});

export const textAnimationCategory = (index) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.4 + index * 0.2, duration: 0.5 },
});

export const categoryAnimationCategory = (index) => ({
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { delay: 0.5 + index * 0.2, duration: 0.5 },
});

export const authorAnimationCategory = (index) => ({
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { delay: 0.6 + index * 0.2, duration: 0.5 },
});

export const authorTextAnimationCategory = (index) => ({
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { delay: 0.7 + index * 0.2, duration: 0.5 },
});

export const authorNameAnimationCategory = (index) => ({
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.8 + index * 0.2, duration: 0.4 },
  whileHover: { scale: 1.02 },
});

export const authorRoleAnimationCategory = (index) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.9 + index * 0.2, duration: 0.4 },
});

export const titleAnimationCategory = (index) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 1 + index * 0.2, duration: 0.5 },
  whileHover: { scale: 1.01 },
});

export const descriptionAnimationCategory = (index) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 1.1 + index * 0.2, duration: 0.5 },
});

//============== Search Modal In Category Page ==============//

export const searchToolbarAnimationCategory = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export const searchTitleAnimationCategory = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, delay: 0.2 },
};

export const searchContainerAnimationCategory = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, delay: 0.3 },
  whileHover: { scale: 1.02 },
};

export const searchIconAnimationCategory = {
  whileHover: { rotate: 10 },
  transition: { duration: 0.2 },
};

export const searchInputAnimationCategory = {
  whileTap: { scale: 0.98 },
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, delay: 0.4 },
};

//============== Article Toolbar In Category Page ==============//

export const toolbarAnimationCategory = {
  initial: { opacity: 0, y: -20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export const toolbarHeadingAnimationCategory = {
  initial: { opacity: 0, x: -20 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { delay: 0.2, duration: 0.5 },
};

export const toolbarTitleAnimationCategory = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay: 0.3, duration: 0.5 },
};

export const toolbarCategoryAnimationCategory = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay: 0.4, duration: 0.5 },
};

export const categoryItemAnimationCategory = (index) => ({
  initial: { opacity: 0, x: -20 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { delay: 0.5 + index * 0.1, duration: 0.5 },
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
});

export const categoryButtonAnimationCategory = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

//============== Article Reaming In Category Page ==============//

export const remainingArticleAnimationCategory = (index) => ({
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: index * 0.2 },
  whileHover: { scale: 1.02 },
});

export const remainingImageAnimationCategory = (index) => ({
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.5, delay: index * 0.2 + 0.2 },
  whileHover: { scale: 1.05 },
});

export const remainingTextAnimationCategory = (index) => ({
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, delay: index * 0.2 + 0.3 },
});

export const remainingToolbarAnimationCategory = (index) => ({
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, delay: index * 0.2 + 0.4 },
});

export const remainingCategoryAnimationCategory = {
  whileHover: { scale: 1.05 },
};

export const remainingDateAnimationCategory = {
  whileHover: { scale: 1.05 },
};

export const remainingTitleAnimationCategory = (index) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: index * 0.2 + 0.5 },
  whileHover: { scale: 1.01 },
});

export const remainingLinkAnimationCategory = (index) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: index * 0.2 + 0.6 },
  whileHover: { scale: 1.05 },
});
