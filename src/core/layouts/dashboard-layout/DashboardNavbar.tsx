import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { makeStyles } from '@mui/styles';
import { AppBar, Toolbar, Container, Theme, Button, IconButton, Box, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';

import { Logo } from 'src/core/components';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useAuth } from 'src/hooks/useAuth';
import { getAuthState } from 'src/store/slices/auth';
import { useSelector } from 'src/store/store';

export function DashboardNavbar() {
  const classes = useStyles();
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
      <Box className={classes.dashboardTitle}>
        <Box className={classes.logoWrapper}>
          <Logo />
          <Typography variant="h1">Fire Jira</Typography>
        </Box>
        <Typography variant="h2">The professional publishing platform</Typography>
      </Box>

      <Toolbar className={classes.toolbar} disableGutters>
        <Container className={classes.container} maxWidth="lg">
          {/* Section divider */}
          <Box sx={{ flexGrow: 1 }} />

          <Button variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    height: '30vh',
    padding: '0 5vw',
    position: 'relative',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    color: theme.palette.grey[0],
    background: '#0a0b0c no-repeat center center',
    backgroundSize: 'cover',
    backgroundImage: 'url(/static/dashboard-cover.jpg)'
  },
  toolbar: {
    margin: '0 auto',
    maxWidth: 1040,
    width: '100%'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  dashboardTitle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10vw 4vw',
    minHeight: 200,
    maxHeight: 450,
    textAlign: 'center',

    '& > h2': {
      marginLeft: theme.spacing(2),
      padding: '5px 0',
      fontSize: 22,
      fontWeight: 700
    }
  },
  logoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '& > h1': {
      marginLeft: theme.spacing(2),
      fontSize: 30,
      fontWeight: 700
    }
  }
}));
