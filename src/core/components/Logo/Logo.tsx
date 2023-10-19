import { Box, BoxProps } from '@mui/material';

// @todo: Make generic component wrappeer for icons
export function Logo({ sx }: BoxProps) {
  return <Box component="img" src="/static/logo.svg" sx={{ width: 40, height: 40, ...sx }} />;
}
