import { Link as RouterLink } from 'react-router-dom';
import { Theme } from '@mui/material';
import { Alert, Box, Container, Link, Stack, Tooltip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { LoginForm, Page } from '../core/components';
import { PATH_AUTH } from '../routes/paths';

export default function LoginPage() {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Login | Fire Jira">
      <Container maxWidth="sm">
        <div className={classes.content}>
          <Stack className={classes.contentStack} direction="row" alignItems="center">
            <Box className={classes.contentStackBox}>
              <Typography variant="h4" gutterBottom>
                Sign in to Fire Jira
              </Typography>
              <Typography className={classes.contentStackBoxTypography}>Enter your details below.</Typography>
            </Box>

            <Tooltip title="Firebase">
              <Box className={classes.authLogo} component="img" src="/static/firebase.svg" />
            </Tooltip>
          </Stack>

          <Alert className={classes.infoBar} severity="info">
            <strong>Demo</strong> email : <strong>joedoe@firejira.com</strong> / password :
            <strong>&nbsp;firejira</strong>
          </Alert>

          <LoginForm />

          <Typography className={classes.registerBar} variant="body2" align="center">
            Don’t have an account?&nbsp;
            <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
              Get started
            </Link>
          </Typography>
        </div>
      </Container>
    </Page>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  content: {
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0),
  },
  contentStack: {
    marginBottom: theme.spacing(5),
  },
  contentStackBox: {
    flexGrow: 1,
  },
  contentStackBoxTypography: {
    color: theme.palette.text.secondary,
  },
  authLogo: {
    width: 32,
    height: 32,
  },
  infoBar: {
    marginBottom: theme.spacing(3),
  },
  registerBar: {
    marginTop: theme.spacing(3),
  },
}));
