import { ReactNode } from 'react';

import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import { shape } from './shape';
import { palette } from './palette';
import { typography } from './typography';
import { breakpoints } from './breakpoints';
import { shadows, customShadows } from './shadows';

type ThemeConfigProps = {
  children: ReactNode;
};

export function ThemeConfig({ children }: ThemeConfigProps) {
  const theme = createTheme({
    palette: { ...palette, mode: 'light' },
    shape,
    typography,
    breakpoints,
    shadows,
    customShadows
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
