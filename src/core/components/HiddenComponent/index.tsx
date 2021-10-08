import { ReactNode } from 'react';

import { Breakpoint, Theme, useMediaQuery } from '@mui/material';

type HiddenComponentProps = {
  children: ReactNode;
  width: 'xsDown' | 'smDown' | 'mdDown' | 'lgDown' | 'xlDown' | 'xsUp' | 'smUp' | 'mdUp' | 'lgUp' | 'xlUp';
};

export function HiddenComponent({ width, children }: HiddenComponentProps) {
  const breakpoint = width.substring(0, 2) as Breakpoint;
  const hiddenUp = useMediaQuery<Theme>((theme) => theme.breakpoints.up(breakpoint));
  const hiddenDown = useMediaQuery<Theme>((theme) => theme.breakpoints.down(breakpoint));

  if (width.includes('Down')) {
    return hiddenDown ? null : <>{children}</>;
  }

  if (width.includes('Up')) {
    return hiddenUp ? null : <>{children}</>;
  }

  return null;
}
