import { alpha } from '@mui/material';
import MUIGlobalStyles from '@mui/material/GlobalStyles';

export const GlobalStyles = (container: string) => (
  <MUIGlobalStyles
    styles={{
      [`html, body, ${container}`]: {
        minHeight: '100%',
      },
      body: {
        padding: 0,
        position: 'relative',
      },
      [`${container}`]: {
        position: 'relative',
        zIndex: 1,
      },
    }}
  />
);
