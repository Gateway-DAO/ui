import { Theme } from '@mui/material/styles';

export const MuiCard: Extract<Theme['components'], object>['MuiCard'] = {
  defaultProps: { elevation: 1 },
  styleOverrides: {
    root: {
      boxShadow: 'none',
    },
  },
};
