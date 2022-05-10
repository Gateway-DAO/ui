import { alpha } from '@mui/material';
import MUIGlobalStyles from '@mui/material/GlobalStyles';

/* TODO: Fix height: 100% on multiple templates

  Dashboard when body:100% => disables scroll
  Home whithout body:100% => #__next doesn't gets to 100% page size
*/

export const GlobalStyles = (container: string) => (
  <MUIGlobalStyles
    styles={{
      [`html, ${container}`]: {
        height: '100%',
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
