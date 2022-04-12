import { theme } from '../../lib/theme';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { PropsWithChildren } from 'react';
import { globalStyles } from './global-styles';

type Props = {
  withGlobalStyles?: boolean;
}

export function ThemeProvider({ children, withGlobalStyles = true }: PropsWithChildren<Props>) {
  return (
    <MUIThemeProvider theme={theme}>
      <>
        <CssBaseline />
        {withGlobalStyles && globalStyles}
        {children}
      </>
    </MUIThemeProvider>
  );
}
