import { Navigate } from 'react-router-dom';

import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

import { Page } from 'src/core/components';
import { getAuthState } from '../store/slices/auth';
import { useSelector } from 'src/store/store';
import { LandingTop } from './external';

export default function LandingPage() {
  const classes = useStyles();
  const { isAuthenticated } = useSelector(getAuthState);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Page className={classes.root} title="Fire Jira">
      <LandingTop />
    </Page>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%'
  }
}));
