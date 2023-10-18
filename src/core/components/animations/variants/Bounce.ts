/**
 * TRANSITION
 */
const TRANSITION_ENTER = {
  duration: 0.72,
  ease: [0.43, 0.13, 0.23, 0.96],
};

const TRANSITION_EXIT = {
  duration: 0.48,
  ease: [0.43, 0.13, 0.23, 0.96],
};

/**
 * BOUNCE OUT
 */
export const bounceOut = {
  animate: {
    scale: [0.9, 1.1, 0.3],
    opacity: [1, 1, 0],
  },
};

export const bounceOutUp = {
  animate: {
    y: [-12, 24, -720],
    scaleY: [0.985, 0.9, 3],
    opacity: [1, 1, 0],
  },
};

export const bounceOutDown = {
  animate: {
    y: [12, -24, 720],
    scaleY: [0.985, 0.9, 3],
    opacity: [1, 1, 0],
  },
};

export const bounceOutLeft = {
  animate: {
    x: [0, 24, -720],
    scaleX: [1, 0.9, 2],
    opacity: [1, 1, 0],
  },
};

export const bounceOutRight = {
  animate: {
    x: [0, -24, 720],
    scaleX: [1, 0.9, 2],
    opacity: [1, 1, 0],
  },
};

/**
 * BOUNCE IN
 */
export const bounceIn = {
  animate: {
    scale: [0.3, 1.1, 0.9, 1.03, 0.97, 1],
    opacity: [0, 1, 1, 1, 1, 1],
    transition: TRANSITION_ENTER,
  },
  exit: bounceOut.animate,
};

export const bounceInUp = {
  animate: {
    y: [720, -24, 12, -4, 0],
    scaleY: [4, 0.9, 0.95, 0.985, 1],
    opacity: [0, 1, 1, 1, 1],
    transition: { ...TRANSITION_ENTER },
  },
  exit: { ...bounceOutDown.animate, transition: TRANSITION_EXIT },
};

export const bounceInDown = {
  animate: {
    y: [-720, 24, -12, 4, 0],
    scaleY: [4, 0.9, 0.95, 0.985, 1],
    opacity: [0, 1, 1, 1, 1],
    transition: TRANSITION_ENTER,
  },
  exit: { ...bounceOutUp.animate, transition: TRANSITION_EXIT },
};

export const bounceInLeft = {
  animate: {
    x: [-720, 24, -12, 4, 0],
    scaleX: [3, 1, 0.98, 0.995, 1],
    opacity: [0, 1, 1, 1, 1],
    transition: TRANSITION_ENTER,
  },
  exit: { ...bounceOutLeft.animate, transition: TRANSITION_EXIT },
};

export const bounceInRight = {
  animate: {
    x: [720, -24, 12, -4, 0],
    scaleX: [3, 1, 0.98, 0.995, 1],
    opacity: [0, 1, 1, 1, 1],
    transition: TRANSITION_ENTER,
  },
  exit: { ...bounceOutRight.animate, transition: TRANSITION_EXIT },
};
