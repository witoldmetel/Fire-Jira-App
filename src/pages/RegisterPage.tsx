import { Link as RouterLink } from 'react-router-dom';

import { Box, Link, Container, Typography, Tooltip, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

import { Page, HiddenComponent, RegisterForm } from '../core/components';
import { PATH_AUTH } from '../routes/paths';

export default function RegisterPage() {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Register | Fire Jira">
      <Container>
        <div className={classes.content}>
          <Stack className={classes.contentStack} direction="row" alignItems="center">
            <Box className={classes.contentStackBox}>
              <Typography variant="h4" gutterBottom>
                Get started absolutely free.
              </Typography>
              <Typography className={classes.contentStackBoxTypography}>
                Free forever. No credit card needed.
              </Typography>
            </Box>
            <Tooltip title={'Firebase'}>
              <Box className={classes.authLogo} component="img" src="/static/firebase.svg" />
            </Tooltip>
          </Stack>

          <RegisterForm />

          <HiddenComponent width="smUp">
            <Typography className={classes.loginBar} variant="body2" align="center">
              Already have an account?&nbsp;
              <Link to={PATH_AUTH.login} component={RouterLink}>
                Login
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
  content: {
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0)
  },
  contentStack: {
    marginBottom: theme.spacing(5)
  },
  contentStackBox: {
    flexGrow: 1
  },
  contentStackBoxTypography: {
    color: theme.palette.text.secondary
  },
  authLogo: {
    width: 32,
    height: 32
  },
  loginBar: {
    marginTop: theme.spacing(3)
  }
}));
