import { Box, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import { ColorSchema } from 'src/core/theme/types';

type SnackbarIconProps = {
  icon: OverridableComponent<SvgIconTypeMap<unknown, 'svg'>>;
  color: ColorSchema;
};

export const SnackbarIcon = ({ icon, color }: SnackbarIconProps) => {
  return (
    <Box
      component="span"
      className={`bg-${color}-main bg-opacity-20 text-${color}-main rounded-full w-10 h-10 flex items-center justify-center mr-4`}
    >
      {icon({ width: 24, height: 24 })}
    </Box>
  );
};
