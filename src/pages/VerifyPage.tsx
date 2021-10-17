import { Link as RouterLink } from 'react-router-dom';

import { Box, Button, Container, Typography, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

import { PATH_AUTH } from '../routes/paths';
import { Page } from '../core/components';

export default function VerifyPage() {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Reset Password | Fire Jira">
      <Container>
        <div className={classes.content}>
          <Box className={classes.box}>
            <Typography variant="h3" gutterBottom>
              Please confirm your email
            </Typography>

            <Stack
              className={classes.stack}
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              spacing={2}
            >
              <Button size="large" variant="outlined" onClick={() => console.log('send again')}>
                Send again
              </Button>
              <Button size="large" variant="outlined" component={RouterLink} to={PATH_AUTH.login}>
                Back
              </Button>
            </Stack>
          </Box>
        </div>
      </Container>
    </Page>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  box: { textAlign: 'center' },
  stack: {
    marginTop: theme.spacing(5)
  }
}));
