import { createTheme } from '@mui/material/styles';

import * as components from './components';
import palette from './config/palette';
import typography from './config/typography';

declare module '@mui/material/styles' {
  type TypeBackground = {
    light: string;
    elevated: string;
  };
  type PaletteColorOptions = {
    elevated: string;
  };
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
