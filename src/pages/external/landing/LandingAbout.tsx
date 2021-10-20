import { motion } from 'framer-motion';

import { Box, Grid, Container, Typography, Theme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { MotionInView, fadeInUp, fadeInRight } from 'src/core/components';

export function LandingAbout() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <div className={classes.content}>
              <MotionInView variants={fadeInUp}>
                <Typography component="p" variant="overline" sx={{ mb: 2, color: 'text.secondary' }}>
                  About application
                </Typography>
              </MotionInView>

              <MotionInView variants={fadeInUp}>
                <Typography variant="h2" sx={{ mb: 3 }}>
                  IS IT <br />
                  FOR ME?
                </Typography>
              </MotionInView>

              <MotionInView variants={fadeInUp}>
                <Typography
                  sx={{
                    mb: 5,
                    color: 'text.secondary'
                  }}
                >
                  When you have to shift through stacked email threads for design approvals, collaborating within the
                  team becomes tough. Therefore, Kanban is meant to cut the amount of time spent on managing projects
                  because any professional should spend their time doing their work and not managing.
                </Typography>
              </MotionInView>
            </div>
          </Grid>

          <Grid item xs={12} md={8} dir="ltr">
            <MotionInView variants={fadeInRight}>
              <Box
                component="img"
                src="/static/shared_goals.svg"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                  justifyContent: 'center'
                }}
              />
            </MotionInView>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(24, 0),
    backgroundImage: `linear-gradient(180deg, ${alpha(theme.palette.grey[300], 0)} 0%, ${theme.palette.grey[300]} 100%)`
  },
  content: {
    width: '100%',
    textAlign: 'center',
    marginBottom: theme.spacing(10),
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
      marginBottom: 0
    }
  },
  screen: {
    paddingRight: 2,
    paddingBottom: 1,
    maxWidth: 160,
    borderRadius: 8,
    backgroundColor: theme.palette.grey[300],
    [theme.breakpoints.up('sm')]: {
      maxWidth: 320,
      paddingRight: 4,
      borderRadius: 12
    },
    '& img': {
      borderRadius: 8,
      [theme.breakpoints.up('sm')]: {
        borderRadius: 12
      }
    }
  }
}));
