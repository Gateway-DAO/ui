import type { TypographyOptions } from '@mui/material/styles/createTypography';
import '@fontsource/plus-jakarta-sans';

export const fonts = {
  PLUS_JAKARTA_SANS: "Plus Jakarta Sans",
  get primary(){return this.PLUS_JAKARTA_SANS}
};

const typography: TypographyOptions = {
  allVariants: {
    fontFamily: `"${fonts.primary}", sans-serif`,
  }
};

export default typography;
