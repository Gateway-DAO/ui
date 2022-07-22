import { Theme } from '@mui/material/styles';

import { white } from '../config/colors';

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
        '& .MuiAlert-icon': {
          color: 'white',
        },
        '& .MuiAlert-message': {
          color: 'white',
        },
      },
    },
  };
