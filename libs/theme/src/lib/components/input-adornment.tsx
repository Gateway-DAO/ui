import { Theme } from '@mui/material/styles';

/**
 * Example of a customized component
 */

export const MuiInputAdornment: Extract<Theme["components"], object>["MuiInputAdornment"]= {
  styleOverrides: {
    root: {
      color: "inherit"
    }
  }
};
