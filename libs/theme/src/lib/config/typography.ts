import type { TypographyOptions } from '@mui/material/styles/createTypography';
import '@fontsource/plus-jakarta-sans';

export const fonts = {
  PLUS_JAKARTA_SANS: 'Plus Jakarta Sans',
  get primary() {
    return this.PLUS_JAKARTA_SANS;
  },
};

const typography: TypographyOptions = {
  allVariants: {
    fontFamily: `"${fonts.primary}", sans-serif`,
  },
  h1: {
    fontWeight: 'bold',
  },
  h2: {
    fontWeight: 'bold',
  },
  h3: {
    fontWeight: 'bold',
  },
  h4: {
    fontWeight: 'bold',
  },
  h5: {
    fontWeight: 'bold',
  },
  h6: {
    fontWeight: 'bold',
  },
};

export default typography;
