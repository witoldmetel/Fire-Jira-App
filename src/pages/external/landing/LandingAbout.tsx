import classnames from 'classnames';

import { Box, Grid, Container, Typography, Theme, Card } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { MotionInView, fadeInUp, fadeInRight } from 'src/core/components';

const CARDS = [
  {
    icon: '/static/spreadsheets.svg',
    description: 'It helps visualize the actual workflow'
  },
  {
    icon: '/static/work_together.svg',
    description: 'It balances the work and workflow'
  },
  {
    icon: '/static/grades.svg',
    description: 'It encourages leadership roles at all levels'
  }
];

export function LandingAbout() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} md={4} className={classes.grid}>
            <div className={classes.content}>
              <MotionInView variants={fadeInUp}>
                <Typography className={classes.topText} component="p" variant="overline">
                  About application
                </Typography>
              </MotionInView>

              <MotionInView variants={fadeInUp}>
                <Typography className={classes.middleText} variant="h2">
                  IS IT <br />
                  FOR ME
                  <Typography component="span" variant="h2" className={classes.textPrimary}>
                    ?
                  </Typography>
                </Typography>
              </MotionInView>

              <MotionInView variants={fadeInUp}>
                <Typography className={classes.bottomText}>
                  When you have to shift through stacked email threads for design approvals, collaborating within the
                  team becomes tough. Therefore, Kanban is meant to cut the amount of time spent on managing projects
                  because any professional should spend their time doing their work and not managing.
                </Typography>
              </MotionInView>
            </div>
          </Grid>

          <Grid item xs={12} md={8}>
            <MotionInView variants={fadeInRight}>
              <Box className={classes.backgroundImage} component="img" src="/static/shared_goals.svg" />
            </MotionInView>
          </Grid>
        </Grid>

        <Grid className={classes.cards} container>
          {CARDS.map((card, index) => (
            <Grid key={card.icon} item xs={12} md={4}>
              <MotionInView variants={fadeInUp}>
                <Card
                  className={classnames(classes.card, {
                    [classes.cardCenter]: index === 1
                  })}
                >
                  <Box className={classes.cardIcon} component="img" src={card.icon} />
                  <Typography>{card.description}</Typography>
                </Card>
              </MotionInView>
            </Grid>
          ))}
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
  grid: {
    display: 'flex',
    alignItems: 'center'
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
  topText: {
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  middleText: {
    marginBottom: theme.spacing(2)
  },
  bottomText: {
    marginBottom: theme.spacing(5),
    color: theme.palette.text.secondary
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
    }
  },
  backgroundImage: {
    width: '100%',
    margin: 'auto',
    [theme.breakpoints.up('lg')]: {
      width: 'auto',
      height: '45vh'
    }
  },
  textPrimary: {
    color: theme.palette.primary.main
  },
  cards: {
    marginTop: theme.spacing(25)
  },
  card: {
    maxWidth: 270,
    minHeight: 100,
    margin: 'auto',
    textAlign: 'center',
    padding: theme.spacing(5),
    boxShadow: `-40px 40px 80px 0 ${alpha(theme.palette.grey[500], 0.48)}`,
    [theme.breakpoints.up('md')]: {
      boxShadow: 'none',
      backgroundColor: theme.palette.grey[200]
    }
  },
  cardCenter: {
    [theme.breakpoints.up('md')]: {
      marginTop: -80,
      backgroundColor: theme.palette.background.paper,
      boxShadow: `-40px 40px 80px 0 ${alpha(theme.palette.grey[500], 0.4)}`
    },
    [theme.breakpoints.down('md')]: {
      margin: `${theme.spacing(5)} auto`
    }
  },
  cardIcon: {
    width: 200,
    height: 200
  }
}));
