import { Theme } from '@mui/material/styles';

export const MuiDialogActions: Extract<
  Theme['components'],
  object
>['MuiDialogActions'] = {
  styleOverrides: {
    root: {
      paddingInline: 24,
      paddingBottom: 16,
      paddingTop: 8,
    },
  },
};
