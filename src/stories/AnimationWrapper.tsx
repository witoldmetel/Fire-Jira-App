import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { motion, MotionProps } from 'framer-motion';

import Logo from './assets/logo.svg';

interface StoryWrapperProps extends MotionProps {
  children?: ReactNode;
}

export function AnimationWrapper({ children, ...other }: StoryWrapperProps) {
  const wrappedChildren = children ?? <Box component="img" src={Logo} sx={{ width: 150, height: 150 }} />;

  return (
    <motion.div {...other} style={{ cursor: 'pointer' }}>
      {wrappedChildren}
    </motion.div>
  );
}
