import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Box, Button, Container, Theme, Toolbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import classnames from 'classnames';
import { HiddenComponent, Logo } from 'src/core/components';
import { useOffSetTop } from 'src/hooks/useOffSetTop';
import { PATH_AUTH, PATH_DASHBOARD } from 'src/routes/paths';
import { getAuthState } from 'src/store/slices/auth';
import { useSelector } from 'src/store/store';

import { mainMenuConfig } from '../constants';

import { MainMenu } from './MainMenu';

export function MainNavbar() {
  const classes = useStyles();
  const isOffset = useOffSetTop(250);
  const { isAuthenticated } = useSelector(getAuthState);

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
            <MainMenu navConfig={mainMenuConfig} />
          </HiddenComponent>

          {!isAuthenticated && (
            <Button component={RouterLink} to={PATH_AUTH.login} variant="contained">
              Login
            </Button>
          )}

          <HiddenComponent width="mdUp">
            <MainMenu navConfig={mainMenuConfig} isMobile />
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
    backgroundColor: 'transparent',
  },
  toolbar: {
    height: 65,
    transition: theme.transitions.create(['height', 'background-color'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
    }),
    [theme.breakpoints.up('md')]: {
      height: 90,
    },
  },
  toolbarOffset: {
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up('md')]: {
      height: 70,
    },
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    boxShadow: theme.customShadows.z8,
  },
}));
