import type { TypographyOptions } from '@mui/material/styles/createTypography';
import '@fontsource/be-vietnam';
import '@fontsource/poppins';

export const fonts = {
  BE_VIETNAM: 'Be Vietnam',
  POPPINS: 'Poppins',
};

const typography: TypographyOptions = {
  allVariants: {
    fontFamily: `"${fonts.BE_VIETNAM}", sans-serif`,
  },
  body2: {
    fontFamily: `"${fonts.POPPINS}", sans-serif`,
  },
};

export default typography;
