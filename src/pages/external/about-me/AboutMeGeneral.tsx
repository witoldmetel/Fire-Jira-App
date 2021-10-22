import { Box, Grid, Button, Container, Typography, Theme, IconButton, Card } from '@mui/material';
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
              <Card sx={{ p: 1, mx: 1.5 }}>
                <Box component="img" src="/static/me.jfif" sx={{ width: '100%', borderRadius: 1.5 }} />
                <Box sx={{ mt: 2, mb: 1 }}>
                  <IconButton>
                    <Facebook width={20} height={20} />
                  </IconButton>
                  <IconButton>
                    <LinkedIn width={20} height={20} />
                  </IconButton>
                  <IconButton>
                    <GitHub width={20} height={20} />
                  </IconButton>
                </Box>
              </Card>
            </MotionInView>
          </Grid>

          <Grid item xs={12} md={6} lg={5}>
            <MotionInView variants={fadeInRight}>
              <Typography variant="h2" sx={{ mb: 3 }}>
                Witold Metel
              </Typography>
            </MotionInView>

            <MotionInView variants={fadeInRight}>
              <Typography
                sx={{
                  color: 'text.secondary'
                }}
              >
                Front-End Developer mostly working in React and Typescript.
              </Typography>
            </MotionInView>

            <MotionInView variants={fadeInRight}>
              <Button variant="outlined" color="inherit" size="large" endIcon={<GitHub width={24} height={24} />}>
                Check out my projects
              </Button>
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
  logo: {
    width: 32,
    height: 32
  },
  textPrimary: {
    color: theme.palette.primary.main
  },
  textSecondary: {
    color: theme.palette.common.white
  }
}));
