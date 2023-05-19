import { PropsWithChildren } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import { GlobalStyles } from './global-styles';
import { theme } from './theme';

type Props = {
  withGlobalStyles?: boolean;
};

export function ThemeProvider({
  children,
  withGlobalStyles = true,
}: PropsWithChildren<Props>) {
  return (
    <MUIThemeProvider theme={theme}>
      <>
        <CssBaseline />
        {withGlobalStyles && <GlobalStyles />}
        {children}
      </>
    </MUIThemeProvider>
  );
}
