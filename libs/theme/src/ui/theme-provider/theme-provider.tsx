import { theme } from '../../lib/theme';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { PropsWithChildren } from 'react';

type Props = {
  withGlobalStyles?: boolean;
}

const global = <GlobalStyles styles={{
  "html, body, #root": {
    minHeight: "100%",
  },
  body: {
    padding: 0,
    height: "100%"
  }
}} />

export function ThemeProvider({ children, withGlobalStyles = true }: PropsWithChildren<Props>) {
  return (
    <MUIThemeProvider theme={theme}>
      <>
        <CssBaseline />
        {withGlobalStyles && global}
        {children}
      </>
    </MUIThemeProvider>
  );
}
