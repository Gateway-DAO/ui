import { createTheme } from '@mui/material/styles';
import palette from './config/palette';
import typography from './config/typography';
import * as components from './components';

export const theme = createTheme({
  palette,
  typography,
  shape: {
    borderRadius: 100,
  },
  components: {
    ...components,
  },
});

