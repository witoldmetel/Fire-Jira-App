import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

import { Page } from 'src/core/components';
import { AboutMeTop } from './external';

export default function AboutMePage() {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="About Me | Fire Jira">
      <AboutMeTop />
    </Page>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(8),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(11)
    }
  }
}));
