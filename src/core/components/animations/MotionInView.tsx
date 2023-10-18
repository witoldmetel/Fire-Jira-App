import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Box, BoxProps } from '@mui/material';
import { motion, MotionProps, useAnimation } from 'framer-motion';

type Props = BoxProps & MotionProps;

interface MotionInViewProps extends Props {
  threshold?: number | number[];
}

export function MotionInView({ children, variants, transition, threshold, ...other }: MotionInViewProps) {
  const controls = useAnimation();
  // @todo: Try to get rid of react-intersection-observer
  const [ref, inView] = useInView({
    threshold: threshold || 0,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!variants) return;

    if (inView) {
      controls.start(Object.keys(variants)[1]);
    } else {
      controls.start(Object.keys(variants)[0]);
    }
  }, [controls, inView, variants]);

  return (
    <Box
      ref={ref}
      component={motion.div}
      initial={variants ? Object.keys(variants)[0] : false}
      animate={controls}
      variants={variants}
      transition={transition}
      {...other}
    >
      {children}
    </Box>
  );
}
