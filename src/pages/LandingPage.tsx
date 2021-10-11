import { makeStyles } from '@mui/styles';
import { Box, Theme } from '@mui/material';

import { Page } from 'src/core/components';

export default function LandingPage() {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Fire Jira">
      <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>Home Page</Box>
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
