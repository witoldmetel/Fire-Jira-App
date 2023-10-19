import { Box, Container, Stack, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { motion } from 'framer-motion';

import { fadeIn, fadeInDown, fadeInRight, MotionText, wrapEnter } from 'src/core/components';

export function ContactMeTop() {
  const classes = useStyles();

  return (
    <>
      <motion.div className={classes.root} initial="initial" animate="animate" variants={wrapEnter}>
        <motion.img className={classes.overlay} alt="overlay" src="/static/overlay.svg" variants={fadeIn} />

        <motion.img className={classes.backgroundImage} src="/static/new_message.svg" variants={fadeInDown} />

        <Container maxWidth="lg">
          <Stack className={classes.content} spacing={1}>
            <Box className={classes.info}>
              <MotionText
                className={classes.textPrimary}
                text="Contact"
                variants={fadeInRight}
                sx={{ fontSize: '4rem' }}
              />
              &nbsp;&nbsp;&nbsp;
              <MotionText text="me" sx={{ fontSize: '4rem' }} />
            </Box>

            <motion.div variants={fadeInRight}>
              <Typography className={classes.textSecondary}>
                Please describe your case to receive the most accurate advice
              </Typography>
            </motion.div>
          </Stack>
        </Container>
      </motion.div>

      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    backgroundColor: theme.palette.grey[400],
    [theme.breakpoints.up('md')]: {
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      display: 'flex',
      position: 'fixed',
      alignItems: 'center',
    },
  },
  content: {
    zIndex: 10,
    maxWidth: 520,
    margin: 'auto',
    textAlign: 'center',
    position: 'relative',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(15),
    [theme.breakpoints.up('md')]: {
      margin: 'unset',
      textAlign: 'left',
    },
  },
  info: {
    display: 'inline-flex',
    color: theme.palette.common.white,
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
  },
  overlay: {
    zIndex: 9,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
  },
  backgroundImage: {
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 8,
    height: '100%',
    width: '100%',
    margin: 'auto',
    position: 'absolute',
    [theme.breakpoints.up('lg')]: {
      right: '8%',
      width: 'auto',
      height: '70vh',
    },
  },
  textPrimary: {
    color: theme.palette.primary.main,
  },
  textSecondary: {
    color: theme.palette.common.white,
  },
}));
