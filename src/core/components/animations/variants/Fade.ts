const DISTANCE = 120;

const TRANSITION_ENTER = {
  duration: 0.64,
  ease: [0.43, 0.13, 0.23, 0.96]
};
const TRANSITION_EXIT = {
  duration: 0.48,
  ease: [0.43, 0.13, 0.23, 0.96]
};

/**
 * Fade In
 */
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: TRANSITION_ENTER },
  exit: { opacity: 0, transition: TRANSITION_EXIT }
};

export const fadeInUp = {
  initial: { y: DISTANCE, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: TRANSITION_ENTER },
  exit: { y: DISTANCE, opacity: 0, transition: TRANSITION_EXIT }
};

export const fadeInLeft = {
  initial: { x: -DISTANCE, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: TRANSITION_ENTER },
  exit: { x: -DISTANCE, opacity: 0, transition: TRANSITION_EXIT }
};

export const fadeInDown = {
  initial: { y: -DISTANCE, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: TRANSITION_ENTER },
  exit: { y: -DISTANCE, opacity: 0, transition: TRANSITION_EXIT }
};

export const fadeInRight = {
  initial: { x: DISTANCE, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: TRANSITION_ENTER },
  exit: { x: DISTANCE, opacity: 0, transition: TRANSITION_EXIT }
};

/**
 * Fade Out
 */
export const fadeOut = {
  initial: { opacity: 1 },
  animate: { opacity: 0, transition: TRANSITION_ENTER },
  exit: { opacity: 1, transition: TRANSITION_EXIT }
};

export const fadeOutUp = {
  initial: { y: 0, opacity: 1 },
  animate: { y: -DISTANCE, opacity: 0, transition: TRANSITION_ENTER },
  exit: { y: 0, opacity: 1, transition: TRANSITION_EXIT }
};

export const fadeOutDown = {
  initial: { y: 0, opacity: 1 },
  animate: { y: DISTANCE, opacity: 0, transition: TRANSITION_ENTER },
  exit: { y: 0, opacity: 1, transition: TRANSITION_EXIT }
};

export const fadeOutLeft = {
  initial: { x: 0, opacity: 1 },
  animate: { x: -DISTANCE, opacity: 0, transition: TRANSITION_ENTER },
  exit: { x: 0, opacity: 1, transition: TRANSITION_EXIT }
};

export const fadeOutRight = {
  initial: { x: 0, opacity: 1 },
  animate: { x: DISTANCE, opacity: 0, transition: TRANSITION_ENTER },
  exit: { x: 0, opacity: 1, transition: TRANSITION_EXIT }
};
