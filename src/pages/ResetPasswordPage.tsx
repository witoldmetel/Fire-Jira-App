import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { Box, Button, Container, Typography, Stack, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import { Close } from '@mui/icons-material';

import { useFirebase } from 'src/hooks/useFirebase';
import { PATH_AUTH } from '../routes/paths';
import { Page, ResetPasswordForm } from '../core/components';

export default function ResetPasswordPage() {
  const classes = useStyles();
  const { resetPassword } = useFirebase();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const resendHandler = async () => {
    await resetPassword?.(email, () =>
      enqueueSnackbar('Resend email success', {
        variant: 'success',
        action: (key) => (
          <IconButton size="small" onClick={() => closeSnackbar(key)}>
            <Close />
          </IconButton>
        )
      })
    );
  };

  return (
    <Page className={classes.root} title="Reset Password | Fire Jira">
      <Container>
        <div className={classes.content}>
          <Box className={classes.firstBox}>
            {!sent ? (
              <>
                <Typography variant="h3" paragraph>
                  Forgot your password?
                </Typography>
                <Typography className={classes.secondaryText}>
                  Please enter the email address associated with your account and We will email you a link to reset your
                  password.
                </Typography>

                <ResetPasswordForm onSent={() => setSent(true)} onGetEmail={(value) => setEmail(value)} />

                <Button
                  className={classes.backButton}
                  fullWidth
                  size="large"
                  variant="outlined"
                  component={RouterLink}
                  to={PATH_AUTH.login}
                >
                  Back
                </Button>
              </>
            ) : (
              <Box className={classes.secondBox}>
                <Typography variant="h3" gutterBottom>
                  Request sent successfully
                </Typography>
                <Typography>
                  We have sent a confirmation email to &nbsp;
                  <strong>{email}</strong>
                  <br />
                  Please check your email.
                </Typography>

                <Stack
                  className={classes.stack}
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  spacing={2}
                >
                  <Button size="large" variant="outlined" onClick={resendHandler}>
                    Send again
                  </Button>
                  <Button size="large" variant="outlined" component={RouterLink} to={PATH_AUTH.login}>
                    Back
                  </Button>
                </Stack>
              </Box>
            )}
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
  firstBox: {
    maxWidth: 480,
    margin: '0 auto'
  },
  secondaryText: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(5)
  },
  secondBox: { textAlign: 'center' },
  backButton: {
    marginTop: theme.spacing(1)
  },
  stack: {
    marginTop: theme.spacing(5)
  }
}));
