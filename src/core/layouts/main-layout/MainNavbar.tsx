import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { makeStyles } from '@mui/styles';
import { AppBar, Toolbar, Container, Theme, Button, Link, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

import { Logo } from 'src/core/components';
import { PATH_AUTH, PATH_DASHBOARD } from 'src/routes/paths';
import { useAuth } from 'src/hooks/useAuth';

export function MainNavbar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // @todo: Check all states for logout
  const handleLogout = async () => {
    try {
      await logout().then(() => navigate('/'));
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout', { variant: 'error' });
    } finally {
      enqueueSnackbar('Logout success', {
        variant: 'success',
        action: (key) => (
          <IconButton size="small" onClick={() => closeSnackbar(key)}>
            <Close />
          </IconButton>
        )
      });
    }
  };

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolbar} disableGutters>
        <Container className={classes.container} maxWidth="lg">
          <RouterLink to={isAuthenticated ? PATH_DASHBOARD.root : '/'}>
            <Logo />
          </RouterLink>

          {isAuthenticated ? (
            <Button variant="outlined" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button variant="outlined">
                <Link to={PATH_AUTH.register} component={RouterLink}>
                  Register
                </Link>
              </Button>
              <Button variant="outlined">
                <Link to={PATH_AUTH.login} component={RouterLink}>
                  Login
                </Link>
              </Button>
            </>
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    boxShadow: 'none',
    backgroundColor: 'transparent'
  },
  toolbar: {
    height: 64,
    transition: theme.transitions.create(['height', 'background-color'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    [theme.breakpoints.up('md')]: {
      height: 88
    }
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));
