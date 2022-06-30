import { alpha } from '@mui/material';

import brandColors from './colors';

const palette = {
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
    secondary: alpha(brandColors.white.main, 0.7),
  },
};

export default palette;
