import { Box, BoxProps } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { motion, MotionProps } from 'framer-motion';

import { fadeInUp } from './variants/Fade';

type Props = BoxProps & MotionProps;

interface TextAnimateProps extends Props {
  text: string;
}

export function MotionText({ text, variants, sx, ...other }: TextAnimateProps) {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper} component={motion.h1} sx={sx} {...other}>
      {text.split('').map((letter, index) => (
        <motion.span key={index} variants={variants || fadeInUp}>
          {letter}
        </motion.span>
      ))}
    </Box>
  );
}

const useStyles = makeStyles(() => ({
  wrapper: {
    typography: 'h1',
    overflow: 'hidden',
    display: 'inline-flex',
  },
}));
