import { Facebook, GitHub, LinkedIn } from '@mui/icons-material';
import { Box, Button, Card, Container, Grid, IconButton, Link, Stack, Theme, Tooltip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { motion } from 'framer-motion';
import { fadeIn, fadeInRight, MotionInView, wrapEnter } from 'src/core/components';

export function AboutMeGeneral() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={5}>
            <MotionInView variants={fadeIn}>
              <Card className={classes.card}>
                <Box
                  className={classes.avatar}
                  component="img"
                  src="https://avatars.githubusercontent.com/u/31034370?v=4"
                />
                <Box className={classes.socials}>
                  <Link href="https://www.facebook.com/witoldmetel/" target="_blank" rel="noopener">
                    <IconButton>
                      <Facebook className={classes.logoIcon} />
                    </IconButton>
                  </Link>
                  <Link href="https://www.linkedin.com/in/witoldmetel" target="_blank" rel="noopener">
                    <IconButton>
                      <LinkedIn className={classes.logoIcon} />
                    </IconButton>
                  </Link>
                  <Link href="https://github.com/witoldmetel" target="_blank" rel="noopener">
                    <IconButton>
                      <GitHub className={classes.logoIcon} />
                    </IconButton>
                  </Link>
                </Box>
              </Card>
            </MotionInView>
          </Grid>

          <Grid item xs={12} md={6} lg={5}>
            <MotionInView variants={fadeInRight}>
              <Typography variant="h2" className={classes.title}>
                Witold Mętel
              </Typography>
            </MotionInView>

            <MotionInView variants={fadeInRight}>
              <Typography className={classes.textSecondary}>
                I&apos;m an experienced Frontend Developer, with over 5 years of experience, working mainly in React and
                Typescript. Recently, I have been focusing on developing my skills in mobile development (React Native)
                and backend (Node.js / Prisma). I&apos;m not afraid of difficult challenges and enjoy working with
                foreign clients. I mainly work in international teams (both small and large), I prefer to work in
                kanban, but I also have experience in scrum. Honest feedback and code review are crucial for me as a
                programmer.
              </Typography>
            </MotionInView>

            <MotionInView initial="initial" animate="animate" variants={wrapEnter}>
              <Typography className={classes.stackTitle} variant="subtitle2">
                The most used:
              </Typography>
              <Stack
                className={classes.stack}
                direction="row"
                spacing={2}
                justifyContent={{ xs: 'center', md: 'flex-start' }}
              >
                <Tooltip title="React">
                  <motion.img className={classes.logo} variants={fadeInRight} src="/static/reactjs.svg" />
                </Tooltip>
                <Tooltip title="Typescript">
                  <motion.img className={classes.logo} variants={fadeInRight} src="/static/typescript.svg" />
                </Tooltip>
                <Tooltip title="Javascript">
                  <motion.img className={classes.logo} variants={fadeInRight} src="/static/javascript.svg" />
                </Tooltip>
                <Tooltip title="Material UI">
                  <motion.img className={classes.logo} variants={fadeInRight} src="/static/material-ui.svg" />
                </Tooltip>
              </Stack>

              <Typography className={classes.stackTitle} variant="subtitle2">
                Experienced:
              </Typography>
              <Stack
                className={classes.stack}
                direction="row"
                spacing={2}
                justifyContent={{ xs: 'center', md: 'flex-start' }}
              >
                <Tooltip title="CSS">
                  <motion.img className={classes.logo} variants={fadeInRight} src="/static/css.svg" />
                </Tooltip>
                <Tooltip title="Redux / Redux Toolkit">
                  <motion.img className={classes.logo} variants={fadeInRight} src="/static/redux.svg" />
                </Tooltip>
                <Tooltip title="MobX">
                  <motion.img className={classes.logo} variants={fadeInRight} src="/static/mobx.svg" />
                </Tooltip>
                <Tooltip title="Webpack">
                  <motion.img className={classes.logo} variants={fadeInRight} src="/static/webpack.svg" />
                </Tooltip>
                <Tooltip title="Parcel">
                  <motion.img className={classes.logo} variants={fadeInRight} src="/static/parceljs.svg" />
                </Tooltip>
                <Tooltip title="Storybook">
                  <motion.img className={classes.logo} variants={fadeInRight} src="/static/storybook.svg" />
                </Tooltip>
              </Stack>

              <Typography className={classes.stackTitle} variant="subtitle2">
                Currently learning:
              </Typography>
              <Stack
                className={classes.stack}
                direction="row"
                spacing={2}
                justifyContent={{ xs: 'center', md: 'flex-start' }}
              >
                <Tooltip title="Blitz">
                  <motion.img className={classes.logo} variants={fadeInRight} src="/static/blitzjs.ico" />
                </Tooltip>
                <Tooltip title="Prisma">
                  <motion.img className={classes.logo} variants={fadeInRight} src="/static/prisma.svg" />
                </Tooltip>
                <Tooltip title="PostgreSQL">
                  <motion.img className={classes.logo} variants={fadeInRight} src="/static/postgresql.svg" />
                </Tooltip>
                <Tooltip title="React Native">
                  <motion.img className={classes.logo} variants={fadeInRight} src="/static/reactjs.svg" />
                </Tooltip>
                <Tooltip title="Firebase">
                  <motion.img className={classes.logo} variants={fadeInRight} src="/static/firebase.svg" />
                </Tooltip>
                <Tooltip title="Vite">
                  <motion.img className={classes.logo} variants={fadeInRight} src="/static/vite.svg" />
                </Tooltip>
                <Tooltip title="Docker">
                  <motion.img className={classes.logo} variants={fadeInRight} src="/static/docker.svg" />
                </Tooltip>
              </Stack>
            </MotionInView>

            <MotionInView className={classes.projectLink} variants={fadeInRight}>
              <Link
                href="https://github.com/witoldmetel?tab=repositories"
                target="_blank"
                rel="noopener"
                underline="none"
              >
                <Button variant="outlined" color="inherit" size="large" endIcon={<GitHub width={24} height={24} />}>
                  Check out my projects
                </Button>
              </Link>
            </MotionInView>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing(30),
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
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
    width: '100%',
    margin: 'auto',
    position: 'absolute',
    [theme.breakpoints.up('lg')]: {
      right: '8%',
      width: 'auto',
      height: '48vh',
    },
  },
  card: {
    padding: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      width: '75%',
      margin: '0 auto',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: '0 auto',
    },
  },
  avatar: {
    width: '100%',
    borderRadius: theme.shape.borderRadiusMd,
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  socials: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  logoIcon: {
    color: theme.palette.primary.main,
    width: 20,
    height: 20,
  },
  textSecondary: {
    color: theme.palette.text.secondary,
  },
  logo: {
    width: 32,
    height: 32,
  },
  stackTitle: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  stack: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  projectLink: {
    marginTop: theme.spacing(5),
  },
}));
