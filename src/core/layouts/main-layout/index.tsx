import { Outlet } from 'react-router-dom';

import { Box, Container, Typography, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { MainNavbar } from './MainNavbar';

export function MainLayout() {
  const classes = useStyles();

  return (
    <>
      <MainNavbar />
      <div>
        <Outlet />
      </div>

      <Box className={classes.footer}>
        <Container maxWidth="lg">
          <Typography variant="caption" component="p">
            Link
          </Typography>
        </Container>
      </Box>
    </>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    padding: '40px 0',
    textAlign: 'center',
    position: 'relative',
    backgroundColor: theme.palette.background.default
  }
}));
