import { Container, Theme, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { Page } from 'src/core/components';

export default function Page404() {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="404 Page Not Found | Fire Jira">
      <Container>
        <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>Page 404</Box>
      </Container>
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
