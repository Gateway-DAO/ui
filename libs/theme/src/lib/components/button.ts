import { Theme } from '@mui/material/styles';

/**
 * Example of a customized component
 */

export const MuiButton: Extract<Theme['components'], object>['MuiButton'] = {
  styleOverrides: {
    root: {
      borderRadius: 100,
    },
  },
};
