import { motion } from 'framer-motion';

import { Box, BoxProps } from '@mui/material';

import { wrapEnter } from './index';

interface MotionContainerProps extends BoxProps {
  initial?: boolean | string;
  open?: boolean;
}

export function MotionContainer({ open, children, ...other }: MotionContainerProps) {
  return (
    <Box component={motion.div} initial={false} animate={open ? 'animate' : 'exit'} variants={wrapEnter} {...other}>
      {children}
    </Box>
  );
}
