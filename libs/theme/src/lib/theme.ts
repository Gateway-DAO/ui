import { createTheme } from '@mui/material/styles';

import * as components from './components';
import palette from './config/palette';
import typography from './config/typography';

export const theme = createTheme({
  palette,
  typography,
  components: {
    ...components,
  },
});

console.log(theme);

export type GatewayTheme = typeof theme;
