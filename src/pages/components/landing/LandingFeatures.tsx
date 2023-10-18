import { Box, Container, Theme, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import classnames from 'classnames';
import { fadeInUp, MotionInView } from 'src/core/components';

// @todo: Add real screen from the app
const IMAGES = [...Array(10)].map((_, index) => `/static/features/clean-${index + 1}.png`);

export function LandingFeatures() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <div className={classes.content}>
          <MotionInView variants={fadeInUp}>
            <Typography className={classes.text} variant="h2" paragraph>
              FIRE JIRA <br />
              <Typography component="span" variant="h2" className={classes.textPrimary}>
                SUPER
              </Typography>
              &nbsp;POWERS
            </Typography>
          </MotionInView>
        </div>

        <Box sx={{ position: 'relative' }}>
          {IMAGES.map((_, index) => (
            <MotionInView
              key={index}
              className={classnames(classes.imageMotion, {
                [classes.image0]: index === 0,
                [classes.image9]: index === 9,
              })}
              threshold={index / 15}
              variants={fadeInUp}
            >
              <Box className={classes.image} component="img" src={`/static/features/clean-${index + 1}.png`} />
            </MotionInView>
          ))}
        </Box>
      </Container>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(10),
  },
  content: {
    maxWidth: 520,
    margin: 'auto',
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      zIndex: 11,
      textAlign: 'left',
      position: 'absolute',
    },
  },
  text: {
    textShadow: `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
  },
  textPrimary: {
    color: theme.palette.primary.main,
  },
  imageMotion: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  image0: {
    zIndex: 8,
  },
  image9: {
    position: 'relative',
    zIndex: 9,
  },
  image: {
    display: 'block',
    maxWidth: '100%',
  },
}));
