import { Theme } from '@mui/material/styles';

export const MuiTableHead: Extract<
  Theme['components'],
  object
>['MuiTableHead'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      ...theme.typography.button,
      color: theme.palette.text.secondary,
    }),
  },
};

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
