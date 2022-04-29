import { PropsWithChildren, useMemo } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import { theme } from '../../lib/theme';
import { GlobalStyles } from './global-styles';

type Props = {
  containerId?: string;
  withGlobalStyles?: boolean;
};

export function ThemeProvider({
  children,
  containerId = 'root',
  withGlobalStyles = true,
}: PropsWithChildren<Props>) {
  const globalStyles = useMemo(
    () => withGlobalStyles && GlobalStyles(containerId),
    [containerId, withGlobalStyles]
  );
  return (
    <MUIThemeProvider theme={theme}>
      <>
        <CssBaseline />
        {globalStyles}
        {children}
      </>
    </MUIThemeProvider>
  );
}
