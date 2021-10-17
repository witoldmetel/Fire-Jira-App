import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@mui/styles';
import { AppBar, Toolbar, Container, Theme } from '@mui/material';

import { Logo } from 'src/core/components';

type AuthLayoutProps = {
  children: ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  const classes = useStyles();

  return (
    <>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar} disableGutters>
          <Container className={classes.container} maxWidth="lg">
            <RouterLink to="/">
              <Logo />
            </RouterLink>
          </Container>
        </Toolbar>
      </AppBar>

      {children}
    </>
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
