import { Navigate } from 'react-router-dom';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { Page } from 'src/core/components';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useSelector } from 'src/store/store';

import { getAuthState } from '../store/slices/auth';

import { LandingAbout, LandingFeatures, LandingTop } from './components';

export default function LandingPage() {
  const classes = useStyles();
  const { isAuthenticated } = useSelector(getAuthState);

  if (isAuthenticated) {
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  return (
    <Page className={classes.root} title="Fire Jira" id="move_top">
      <LandingTop />
      <div className={classes.content}>
        <LandingAbout />
        <LandingFeatures />
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
