import { Theme } from '@mui/material/styles';

export const MuiAvatar: Extract<Theme["components"], object>["MuiAvatar"]= {
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.palette.common.white,
    }),
    colorDefault: ({ theme }) => ({
        background: theme.palette.grey["800"]
    })
  }
};
