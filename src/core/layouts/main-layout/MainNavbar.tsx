import { Link as RouterLink } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import { Box, Button, AppBar, Toolbar, Container } from '@mui/material';

import { Logo, HiddenComponent } from 'src/core/components';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  [theme.breakpoints.up('md')]: {
    height: APP_BAR_DESKTOP
  }
}));

export type MenuItemProps = {
  title: string;
  path: string;
  icon?: JSX.Element;
  to?: string;
  children?: {
    subheader: string;
    items: {
      title: string;
      path: string;
    }[];
  }[];
};

export type MenuProps = {
  isOffset: boolean;
  isHome: boolean;
  navConfig: MenuItemProps[];
};

export function MainNavbar() {
  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
      <ToolbarStyle disableGutters>
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <RouterLink to="/">
            <Logo />
          </RouterLink>
          Ts v2.6.0
          <Box sx={{ flexGrow: 1 }} />
          <HiddenComponent width="mdDown">Menu Desktop</HiddenComponent>
          <Button variant="contained" target="_blank" href="https://material-ui.com/store/items/minimal-dashboard/">
            Purchase Now
          </Button>
          <HiddenComponent width="mdUp">Menu Mobile</HiddenComponent>
        </Container>
      </ToolbarStyle>
    </AppBar>
  );
}
