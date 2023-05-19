import { GatewayTheme } from '@/theme';

import { alpha } from '@mui/material';

export const withGradientAfter = (theme: GatewayTheme) => ({
  content: "''",
  pointerEvents: 'none',
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  background: `linear-gradient(170deg, ${alpha(
    theme.palette.primary.main,
    0
  )} 70%, ${alpha(theme.palette.primary.main, 0.2)} 92%)`,
  opacity: 0.8,
  height: 240,
  zIndex: -1,
});
