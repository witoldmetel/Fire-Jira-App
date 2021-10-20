import { Box, BoxProps } from '@mui/material';

export function Logo({ sx }: BoxProps) {
  return <Box component="img" src="/static/logo.svg" sx={{ width: 40, height: 40, ...sx }} />;
}
