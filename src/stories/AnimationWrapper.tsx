import { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { Box } from '@mui/material';

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
