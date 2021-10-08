import { useLocation, Outlet } from 'react-router-dom';

import { Box, Container, Typography } from '@mui/material';

export function MainLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <>
      <div />
      <div>
        <Outlet />
      </div>

      {!isHome ? (
        <div />
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
