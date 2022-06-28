import { Theme } from '@mui/material/styles';

export const MuiTableCell: Extract<
  Theme['components'],
  object
>['MuiTableCell'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderBottomColor: theme.palette.divider,
    }),
  },
};
