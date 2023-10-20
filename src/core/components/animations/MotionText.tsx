import { Box, BoxProps } from '@mui/material';
import { motion, MotionProps } from 'framer-motion';

import { fadeInUp } from './variants/Fade';

type Props = BoxProps & MotionProps;

interface TextAnimateProps extends Props {
  text: string;
}

export function MotionText({ text, variants, sx, ...other }: TextAnimateProps) {
  return (
    <Box className="overflow-hidden inline-flex" component={motion.h1} sx={sx} {...other}>
      {text.split('').map((letter, index) => (
        <motion.span key={index} variants={variants || fadeInUp}>
          {letter}
        </motion.span>
      ))}
    </Box>
  );
}
