import { theme } from '../../lib/theme';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { PropsWithChildren, useMemo } from 'react';
import { GlobalStyles } from './global-styles';

type Props = {
  containerId?: string;
  withGlobalStyles?: boolean;
}

export function ThemeProvider({ children, containerId = "root", withGlobalStyles = true }: PropsWithChildren<Props>) {
  const globalStyles = useMemo(() => withGlobalStyles &&  GlobalStyles(containerId), [containerId, withGlobalStyles]);
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
