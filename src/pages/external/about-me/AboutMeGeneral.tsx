import { Box, Grid, Button, Container, Typography, Theme, IconButton, Card, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Facebook, GitHub, LinkedIn } from '@mui/icons-material';

import { fadeIn, fadeInRight, MotionInView } from 'src/core/components';

export function AboutMeGeneral() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={5}>
            <MotionInView variants={fadeIn}>
              <Card className={classes.card}>
                <Box className={classes.avatar} component="img" src="/static/me.jfif" />
                <Box className={classes.socials}>
                  <Link
                    component={IconButton}
                    href="https://www.facebook.com/Managersky/"
                    target="_blank"
                    rel="noopener"
                  >
                    <Facebook className={classes.logoIcon} />
                  </Link>
                  <Link
                    component={IconButton}
                    href="https://www.linkedin.com/in/witoldmetel"
                    target="_blank"
                    rel="noopener"
                  >
                    <LinkedIn className={classes.logoIcon} />
                  </Link>
                  <Link component={IconButton} href="https://github.com/witoldmetel" target="_blank" rel="noopener">
                    <GitHub className={classes.logoIcon} />
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
                Front-End Developer mostly working in React and Typescript.
              </Typography>
            </MotionInView>

            <MotionInView variants={fadeInRight}>
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
    paddingTop: theme.spacing(20),
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('md')]: {
      textAlign: 'left'
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
  card: {
    padding: theme.spacing(2)
  },
  avatar: {
    width: '100%',
    borderRadius: theme.shape.borderRadiusMd
  },
  title: {
    marginBottom: theme.spacing(3)
  },
  socials: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  logoIcon: {
    width: 20,
    height: 20
  },
  textSecondary: {
    color: theme.palette.text.secondary
  }
}));
