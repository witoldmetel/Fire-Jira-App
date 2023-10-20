import { Box, Button, Container, Typography } from '@mui/material';

import { Page } from '../core/components';
import { useFirebase } from '../core/hooks';

export default function VerifyPage() {
  const { sendConfirmationEmail } = useFirebase();

  return (
    <Page className="flex min-h-screen items-center justify-center" title="Verify Email | Fire Jira">
      <Container>
        <div className="max-w-480 mx-auto flex min-h-screen flex-col justify-center">
          <Box className="text-center">
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
