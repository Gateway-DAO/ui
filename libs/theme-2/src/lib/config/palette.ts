import { alpha, PaletteOptions } from '@mui/material';

import brandColors from './colors';

const palette: PaletteOptions = {
  mode: 'dark',
  primary: {
    ...brandColors.purple,
  },
  secondary: {
    ...brandColors.white,
  },
  background: {
    default: brandColors.background.main,
    paper: brandColors.background.main,
    light: brandColors.background.light,
    elevated: brandColors.background.elevated,
  },
  text: {
    primary: brandColors.white.main,
    secondary: alpha(brandColors.white.main, 0.7),
  },
};

export default palette;
