import { createTheme } from '@mui/material/styles';
import palette from './config/palette';
import typography from './config/typography';

export const theme = createTheme({
  palette,
  typography,
  components: {
    MuiPaper: {
      defaultProps: { elevation: 0 },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0 },
    },
  },
});

