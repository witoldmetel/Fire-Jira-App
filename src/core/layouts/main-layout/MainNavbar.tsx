import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@mui/styles';
import { AppBar, Toolbar, Container, Theme, Button, Link } from '@mui/material';

import { Logo } from 'src/core/components';
import { PATH_AUTH } from 'src/routes/paths';

export function MainNavbar() {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolbar} disableGutters>
        <Container className={classes.container} maxWidth="lg">
          <RouterLink to="/">
            <Logo />
          </RouterLink>

          <Button variant="outlined">
            <Link to={PATH_AUTH.login} component={RouterLink}>
              Login
            </Link>
          </Button>
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
