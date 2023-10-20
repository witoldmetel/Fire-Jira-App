import { toast } from 'react-toastify';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { Page } from 'src/core/components';

import { ContactMeForm, ContactMeTop } from './components';

export default function ContactMePage() {
  const classes = useStyles();
  const notify = () => toast('Wow so easy !');
  return (
    <Page className={classes.root} title="Contact Me | Fire Jira" id="move_top">
      <ContactMeTop />
      <div className={classes.content}>
        <button onClick={notify}>Notify !</button>
        <ContactMeForm />
      </div>
    </Page>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
  },
  content: {
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: theme.palette.background.default,
  },
}));
