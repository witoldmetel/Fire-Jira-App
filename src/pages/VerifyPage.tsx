import { Box, Button, Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { useFirebase } from 'src/hooks/useFirebase';
import { Page } from '../core/components';

export default function VerifyPage() {
  const classes = useStyles();
  const { sendConfirmationEmail } = useFirebase();

  return (
    <Page className={classes.root} title="Verify Email | Fire Jira">
      <Container>
        <div className={classes.content}>
          <Box className={classes.box}>
            <Typography variant="h3" gutterBottom>
              Go to your email inbox and please verify your email
            </Typography>

            <Button fullWidth size="large" variant="contained" onClick={sendConfirmationEmail}>
              Send again
            </Button>
          </Box>
        </div>
      </Container>
    </Page>
  );
}

const useStyles = makeStyles(() => ({
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
  box: { textAlign: 'center' }
}));
