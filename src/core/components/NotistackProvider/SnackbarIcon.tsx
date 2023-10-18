import { Box, SvgIconTypeMap, Theme } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { ColorSchema } from 'src/core/theme/types';

type SnackbarIconProps = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  color: ColorSchema;
};

export const SnackbarIcon = ({ icon, color }: SnackbarIconProps) => {
  const classes = useStyles();
  const Icon = icon;

  return (
    <Box
      className={classes.root}
      sx={{
        color: `${color}.main`,
        bgcolor: (theme) => alpha(theme.palette[color].main, 0.16),
      }}
      component="span"
    >
      <Icon width={24} height={24} />
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginRight: theme.spacing(1.5),
    width: 40,
    height: 40,
    display: 'flex',
    borderRadius: theme.spacing(1.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
