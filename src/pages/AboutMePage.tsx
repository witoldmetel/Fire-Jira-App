import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

import { Page } from 'src/core/components';
import { AboutMeTop, AboutMeGeneral } from './external';

export default function AboutMePage() {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="About Me | Fire Jira" id="move_top">
      <AboutMeTop />
      <div className={classes.content}>
        <AboutMeGeneral />
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
