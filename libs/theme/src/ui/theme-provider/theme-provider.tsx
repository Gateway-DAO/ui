import { theme } from '../../lib/theme';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { PropsWithChildren } from 'react';

export function ThemeProvider({ children }: PropsWithChildren<unknown>) {
  return (
    <MUIThemeProvider theme={theme}>
      <>
        <CssBaseline />
        {children}
      </>
    </MUIThemeProvider>
  );
}
