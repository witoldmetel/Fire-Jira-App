import { ReactNode } from 'react';
import { CssBaseline } from '@mui/material';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';

import { breakpoints } from './breakpoints';
import { ComponentsOverrides } from './overrides';
import { palette } from './palette';
import { customShadows, shadows } from './shadows';
import { shape } from './shape';
import { typography } from './typography';

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
    customShadows,
  });

  theme.components = ComponentsOverrides(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
