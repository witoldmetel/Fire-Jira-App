import { ReactNode } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { SnackbarProvider } from 'notistack';

import { SnackbarIcon } from './SnackbarIcon';

type NotistackProviderProps = {
  children: ReactNode;
};

export function NotistackProvider({ children }: NotistackProviderProps) {
  const classes = useStyles();

  return (
    <SnackbarProvider
      classes={{
        root: classes.root,
      }}
      dense
      maxSnack={4}
      // preventDuplicate
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      iconVariant={{
        success: <SnackbarIcon icon={CheckCircleIcon} color="success" />,
        error: <SnackbarIcon icon={ErrorIcon} color="error" />,
        warning: <SnackbarIcon icon={WarningIcon} color="warning" />,
        info: <SnackbarIcon icon={InfoIcon} color="info" />,
      }}
    >
      {children}
    </SnackbarProvider>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .SnackbarContent-root': {
      width: '100%',
      padding: theme.spacing(1.5),
      margin: theme.spacing(0.25, 0),
      boxShadow: theme.customShadows.z8,
      borderRadius: theme.shape.borderRadius,
      color: theme.palette.grey[0],
      backgroundColor: theme.palette.grey[900],

      '&.SnackbarItem-variantSuccess, &.SnackbarItem-variantError, &.SnackbarItem-variantWarning, &.SnackbarItem-variantInfo':
        {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.paper,
        },
    },

    '& .SnackbarItem-message': {
      padding: '0 !important',
      fontWeight: theme.typography.fontWeightMedium,
    },

    '& .SnackbarItem-action': {
      marginRight: 0,
      color: theme.palette.action.active,
      '& svg': { width: 20, height: 20 },
    },
  },
}));
