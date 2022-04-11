import type { PaletteOptions } from '@mui/material/styles/createPalette';

const colors = {
  purple: {
    main: '#170627',
    dark: '#10041b',
    light: '#453752',
  },
  blue: {
    dark: '#170627',
  },
};

const palette: PaletteOptions = {
  mode: 'dark',
  primary: {
    ...colors.purple,
  },
  secondary: {
    main: '#FE02B9',
    dark: '#b10181',
    light: '#fe34c7',
  },
  background: {
    default: colors.blue.dark,
  },
  text: {
    primary: '#efefef',
  },
  action: {
    hover: colors.purple.main,
    active: colors.purple.main,
  },
};

export default palette;
