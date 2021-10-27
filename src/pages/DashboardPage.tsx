import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

import { Page } from 'src/core/components';
import { LandingAbout } from './external';

export default function DashboardPage() {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Dashboard | Fire Jira">
      <div className={classes.content}>
        <LandingAbout />
      </div>
    </Page>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%'
  },
  content: {
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: theme.palette.background.default
  }
}));
