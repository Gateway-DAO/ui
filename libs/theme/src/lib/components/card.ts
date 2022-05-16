import { Theme } from '@mui/material/styles';

export const MuiCard: Extract<Theme['components'], object>['MuiCard'] = {
  defaultProps: { elevation: 1 },
  styleOverrides: {
    root: ({ theme }) => ({
      boxShadow: 'none',
      border: '1px solid',
      borderColor: theme.palette.divider,
    }),
  },
};
