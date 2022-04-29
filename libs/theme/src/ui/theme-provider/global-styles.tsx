import { alpha } from '@mui/material';
import MUIGlobalStyles from '@mui/material/GlobalStyles';

export const GlobalStyles = (container: string) => (
  <MUIGlobalStyles
    styles={(theme) => ({
      [`html, body, #${container}`]: {
        height: '100%',
      },
      body: {
        padding: 0,
        '&:after': {
          content: "''",
          pointerEvents: 'none',
          position: 'absolute',
          bottom: 0,
          inset: 'auto 0 0',
          background: `linear-gradient(170deg, ${alpha(
            theme.palette.primary.main,
            0
          )} 70%, ${alpha(theme.palette.primary.main, 0.2)} 92%)`,
          opacity: 0.8,
          height: 240,
        },
      },
    })}
  />
);
