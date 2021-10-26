import { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';

import { Logo } from '../core/components/Logo';

interface StoryWrapperProps extends MotionProps {
  children?: ReactNode;
}

export function AnimationWrapper({ children, variants, ...other }: StoryWrapperProps) {
  const wrappedChildren = children ?? <Logo />;

  return (
    <motion.div variants={variants} {...other}>
      {wrappedChildren}
    </motion.div>
  );
}
