import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import classnames from 'classnames';

import { makeStyles } from '@mui/styles';
import { AppBar, Toolbar, Container, Theme, Button, IconButton, Box } from '@mui/material';
import { Close } from '@mui/icons-material';

import { Logo, HiddenComponent } from 'src/core/components';
import { PATH_AUTH, PATH_DASHBOARD } from 'src/routes/paths';
import { useAuth } from 'src/hooks/useAuth';
import { useOffSetTop } from 'src/hooks/useOffSetTop';
import { getAuthState } from 'src/store/slices/auth';
import { useSelector } from 'src/store/store';
import { MainMenu } from './MainMenu';
import { mainMenuConfig } from '../constants';

export function MainNavbar() {
  const classes = useStyles();
  const isOffset = useOffSetTop(250);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isAuthenticated } = useSelector(getAuthState);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleLogout = async () => {
    try {
      await logout(() =>
        enqueueSnackbar('Logout success', {
          variant: 'success',
          action: (key) => (
            <IconButton size="small" onClick={() => closeSnackbar(key)}>
              <Close />
            </IconButton>
          )
        })
      ).then(() => {
        navigate('/');
      });
    } catch (error) {
      enqueueSnackbar('Unable to logout', { variant: 'error' });
    }
  };

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classnames(classes.toolbar, { [classes.toolbarOffset]: isOffset })} disableGutters>
        <Container className={classes.container} maxWidth="lg">
          <RouterLink to={isAuthenticated ? PATH_DASHBOARD.root : '/'}>
            <Logo />
          </RouterLink>

          {/* Section divider */}
          <Box sx={{ flexGrow: 1 }} />

          <HiddenComponent width="mdDown">
            <MainMenu isOffset={isOffset} navConfig={mainMenuConfig} />
          </HiddenComponent>

          {isAuthenticated ? (
            <Button variant="outlined" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button component={RouterLink} to={PATH_AUTH.register} variant="outlined">
                Register
              </Button>
              <Button component={RouterLink} to={PATH_AUTH.login} variant="contained">
                Login
              </Button>
            </>
          )}

          <HiddenComponent width="mdUp">
            <MainMenu isOffset={isOffset} navConfig={mainMenuConfig} isMobile />
          </HiddenComponent>
        </Container>
      </Toolbar>

      {isOffset && <div className={classes.shadowToolbar} />}
    </AppBar>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    boxShadow: 'none',
    backgroundColor: 'transparent'
  },
  toolbar: {
    height: 65,
    transition: theme.transitions.create(['height', 'background-color'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    [theme.breakpoints.up('md')]: {
      height: 90
    }
  },
  toolbarOffset: {
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up('md')]: {
      height: 70
    }
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  shadowToolbar: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 25,
    zIndex: -1,
    margin: 'auto',
    borderRadius: '50%',
    position: 'absolute',
    width: `calc(100% - 48px)`,
    boxShadow: theme.customShadows.z8
  }
}));
