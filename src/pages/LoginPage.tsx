import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

import { Box, Card, Stack, Link, Alert, Tooltip, Container, Typography } from '@mui/material';

import { PATH_AUTH } from '../../routes/paths';

import { MainLayout } from '../core/layouts/main-layout';
import { Page, HiddenComponent, LoginForm } from '../core/components';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const classes = useStyles();
  const { method } = useAuth();

  return (
    <Page className={classes.root} title="Login | Minimal-UI">
      <MainLayout>
        Don’t have an account? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
          Get started
        </Link>
      </MainLayout>

      <HiddenComponent width="mdDown">
        <Card className={classes.section}>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome Back
          </Typography>
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </Card>
      </HiddenComponent>

      <Container maxWidth="sm">
        <div className={classes.content}>
          <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Sign in to Minimal
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
            </Box>

            <Tooltip title={method}>
              <Box component="img" src={`/static/auth/ic_${method}.png`} sx={{ width: 32, height: 32 }} />
            </Tooltip>
          </Stack>

          <Alert severity="info" sx={{ mb: 3 }}>
            Use email : <strong>demo@minimals.cc</strong> / password :<strong>&nbsp;demo1234</strong>
          </Alert>

          <LoginForm />

          <HiddenComponent width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don’t have an account?&nbsp;
              <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
                Get started
              </Link>
            </Typography>
          </HiddenComponent>
        </div>
      </Container>
    </Page>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  section: {
    width: '100%',
    maxWidth: 464,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2)
  },
  content: {
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0)
  }
}));
