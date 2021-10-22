import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

import { Page } from 'src/core/components';
import { ContactMeTop } from './external';

export default function ContactMePage() {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Contact Me | Fire Jira" id="move_top">
      <ContactMeTop />
      <div className={classes.content}>xd</div>
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
