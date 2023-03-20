import { Theme } from '@mui/material/styles';
import { alpha } from '@mui/system';

export const MuiAvatar: Extract<Theme['components'], object>['MuiAvatar'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.palette.common.white,
    }),
    colorDefault: ({ theme }) => ({
      background: alpha(theme.palette.common.white, 0.15),
    }),
  },
};
