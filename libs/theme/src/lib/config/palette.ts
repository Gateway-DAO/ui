import type { PaletteOptions } from '@mui/material/styles/createPalette';
import brandColors from "./colors"


const palette: PaletteOptions = {
  mode: 'dark',
  primary: {
    ...brandColors.purple,
  },
  background: {
    default: brandColors.background.main,
  },
  text: {
    primary: brandColors.grays.main,
  },
  action: {
    hover: brandColors.purple.main,
    active: brandColors.purple.main,
  },
};

export default palette;
