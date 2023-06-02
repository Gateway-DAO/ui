import { Theme } from '@mui/material/styles';

/**
 * Example of a customized component
 */

export const MuiSnackbar: Extract<Theme['components'], object>['MuiSnackbar'] =
  {
    defaultProps: {
      sx: {
        '&.MuiSnackbar-root': {
          left: '50%',
          transform: 'translate(-50%, 0)',
        },
        '& .MuiAlert-standardError': {
          background: '#FF002E',
        },
        '& .MuiAlert-icon .MuiSvgIcon-root': {
          color: 'white',
        },
        '& .MuiAlert-message': {
          color: 'white',
        },
      },
    },
  };
