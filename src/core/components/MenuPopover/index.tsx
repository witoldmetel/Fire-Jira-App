import { Popover, PopoverProps } from '@mui/material';

export function MenuPopover({ children, sx, ...other }: PopoverProps) {
  return (
    <Popover
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: {
          mt: 1.5,
          ml: 0.5,
          overflow: 'inherit',
          boxShadow: (theme) => theme.customShadows.z20,
          border: (theme) => `solid 1px ${theme.palette.grey[500_8]}`,
          width: 200,
          ...sx
        }
      }}
      {...other}
    >
      {children}
    </Popover>
  );
}
