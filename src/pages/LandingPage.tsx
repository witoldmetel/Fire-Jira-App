import { Navigate } from 'react-router-dom';

import { makeStyles } from '@mui/styles';
import { Box, Theme } from '@mui/material';

import { Page } from 'src/core/components';
import { getAuthState } from '../store/slices/auth';
import { useSelector } from 'src/store/store';

export default function LandingPage() {
  const classes = useStyles();
  const { isAuthenticated } = useSelector(getAuthState);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Page className={classes.root} title="Fire Jira">
      <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>Landing Page</Box>
    </Page>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(10)
  }
}));
