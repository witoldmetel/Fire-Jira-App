import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Close } from '@mui/icons-material';
import { Box, Button, Container, IconButton, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

import { Page, ResetPasswordForm } from '../core/components';
import { useFirebase } from '../core/hooks';
import { PATH_AUTH } from '../routes/paths';

export default function ResetPasswordPage() {
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
        ),
      })
    );
  };

  return (
    <Page className="flex min-h-screen items-center justify-center" title="Reset Password | Fire Jira">
      <Container>
        <div className="max-w-480 m-auto flex min-h-screen flex-col justify-center">
          <Box className="max-w-480 mx-auto">
            {!sent ? (
              <>
                <Typography variant="h3" paragraph>
                  Forgot your password?
                </Typography>
                <Typography className="text-text-secondary mb-20">
                  Please enter the email address associated with your account and We will email you a link to reset your
                  password.
                </Typography>

                <ResetPasswordForm onSent={() => setSent(true)} onGetEmail={(value) => setEmail(value)} />

                <Button
                  className="mt-4"
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
              <Box className="text-center">
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
                  className="mt-20"
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
