import { Theme } from '@mui/material/styles';

/**
 * Example of a customized component
 */

export const MuiButton: Extract<Theme['components'], object>['MuiButton'] = {
  defaultProps: {
    disableElevation: true,
  },
  styleOverrides: {
    root: {
      borderRadius: 100,
      fontWeight: 700,
      fontSize: 12,
    },
  },
};
