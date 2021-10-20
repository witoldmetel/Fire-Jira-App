import { motion } from 'framer-motion';

import { Button, Box, Tooltip, Container, Typography, Stack, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { useAuth } from 'src/hooks/useAuth';
import { fadeIn, fadeInUp, fadeInRight, wrapEnter } from 'src/core/components';

export function LandingTop() {
  const classes = useStyles();
  const { login } = useAuth();

  return (
    <>
      <motion.div className={classes.root} initial="initial" animate="animate" variants={wrapEnter}>
        <motion.img className={classes.overlay} alt="overlay" src="/static/overlay.svg" variants={fadeIn} />

        <motion.img
          className={classes.backgroundImage}
          alt="hero"
          src="/static/thought_process.svg"
          variants={fadeInUp}
        />

        <Container maxWidth="lg">
          <Stack className={classes.content} spacing={5}>
            <motion.div variants={fadeInRight}>
              <Typography variant="h1" sx={{ color: 'common.white' }}>
                Manage your <br />
                new project <br /> with
                <Typography component="span" variant="h1" sx={{ color: 'primary.main' }}>
                  &nbsp;Fire Jira
                </Typography>
              </Typography>
            </motion.div>

            <motion.div variants={fadeInRight}>
              <Typography sx={{ color: 'common.white' }}>
                Make Your Own Workflow! Track and manage projects in real time. Register and check it now!
              </Typography>
            </motion.div>

            <motion.div variants={fadeInRight}>
              <Button size="large" variant="contained" onClick={() => login('joedoe@firejira.com', 'firejira', false)}>
                Live Demo
              </Button>
            </motion.div>

            <Stack direction="row" spacing={1.5} justifyContent={{ xs: 'center', md: 'flex-start' }}>
              <Tooltip title={'React'}>
                <motion.img className={classes.logo} variants={fadeInRight} src="/static/reactjs.svg" />
              </Tooltip>
              <Tooltip title={'Typescript'}>
                <motion.img className={classes.logo} variants={fadeInRight} src="/static/typescript.svg" />
              </Tooltip>
              <Tooltip title={'Redux Toolkit'}>
                <motion.img className={classes.logo} variants={fadeInRight} src="/static/redux.svg" />
              </Tooltip>
              <Tooltip title={'Firebase'}>
                <motion.img className={classes.logo} variants={fadeInRight} src="/static/firebase.png" />
              </Tooltip>
              <Tooltip title={'Material UI'}>
                <motion.img className={classes.logo} variants={fadeInRight} src="/static/material-ui.svg" />
              </Tooltip>
              <Tooltip title={'Vite'}>
                <motion.img className={classes.logo} variants={fadeInRight} src="/static/vite.svg" />
              </Tooltip>
            </Stack>
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
      alignItems: 'center'
    }
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
      textAlign: 'left'
    }
  },
  overlay: {
    zIndex: 9,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute'
  },
  backgroundImage: {
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 8,
    width: '100%',
    margin: 'auto',
    position: 'absolute',
    [theme.breakpoints.up('lg')]: {
      right: '8%',
      width: 'auto',
      height: '48vh'
    }
  },
  logo: {
    width: 32,
    height: 32
  }
}));
