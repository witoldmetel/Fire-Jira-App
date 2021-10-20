export const wrapEnter = {
  animate: {
    transition: { staggerChildren: 0.1 }
  }
};

export const wrapExit = {
  exit: {
    transition: { staggerChildren: 0.1 }
  }
};

export const wrapBoth = {
  animate: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 }
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};
