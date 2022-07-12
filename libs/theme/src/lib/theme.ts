import { createTheme } from '@mui/material/styles';

import * as components from './components';
import palette from './config/palette';
import typography from './config/typography';

declare module '@mui/material/styles' {
  interface TypeBackground {
    light: string;
    elevated: string;
  }
  interface PaletteColorOptions {
    elevated: string;
  }
}

export const theme = createTheme({
  palette,
  typography,
  shape: {
    borderRadius: 8,
  },
  components: {
    ...components,
  },
});

export type GatewayTheme = typeof theme;
