import { useLocation, Outlet } from 'react-router-dom';

import { Box, Container, Typography } from '@mui/material';

import { MainNavbar } from './MainNavbar';
import { MainFooter } from './MainFooter';

export function MainLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <>
      <MainNavbar />
      <div>
        <Outlet />
      </div>

      {!isHome ? (
        <MainFooter />
      ) : (
        <Box
          sx={{
            py: 5,
            textAlign: 'center',
            position: 'relative',
            bgcolor: 'background.default'
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="caption" component="p">
              Link
            </Typography>
          </Container>
        </Box>
      )}
    </>
  );
}
