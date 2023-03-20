import { PropsWithChildren } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import { theme } from '../../lib/theme';
import { GlobalStyles } from './global-styles';

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
