import type { PaletteOptions } from '@mui/material/styles/createPalette';

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
  },
  text: {
    primary: brandColors.white.main,
  },
};

export default palette;
