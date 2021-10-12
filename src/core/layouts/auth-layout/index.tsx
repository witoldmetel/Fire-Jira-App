import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Typography, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { Logo, HiddenComponent } from 'src/core/components';

type AuthLayoutProps = {
  children: ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <RouterLink to="/">
        <Logo />
      </RouterLink>

      <HiddenComponent width="smDown">
        <Typography
          variant="body2"
          sx={{
            mt: { md: -2 }
          }}
        >
          {children}
        </Typography>
      </HiddenComponent>
    </header>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    top: 0,
    zIndex: 9,
    lineHeight: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    padding: theme.spacing(3),
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      alignItems: 'flex-start',
      padding: theme.spacing(7, 5, 0, 7)
    }
  }
}));
