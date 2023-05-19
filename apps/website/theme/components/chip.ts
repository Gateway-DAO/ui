import { Theme } from '@mui/material/styles';

export const MuiChip: Extract<Theme['components'], object>['MuiChip'] = {
  styleOverrides: {
    root: {
      fontFamily: 'inherit',
    },
  },
};
