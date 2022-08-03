/* eslint-disable @typescript-eslint/no-empty-interface */
import {
  ExtraPalette,
  ExtraPaletteOptions,
  ExtraTheme,
  ExtraTypeBackground,
} from '@gateway/theme';

import {
  Theme,
  ThemeOptions,
  Palette,
  PaletteOptions,
} from '@mui/material/styles';

/**
 * Adding on extra palette properties
 */
declare module '@mui/material/styles/createPalette' {
  // This controls what appears when you use the theme variable inside sx, styled, etc.
  export interface Palette extends ExtraPalette {}
  // This controls what you are allowed to specify in `createTheme`.
  export interface PaletteColorOptions extends ExtraPaletteOptions {}
  export interface SimplePaletteColorOptions extends ExtraPaletteOptions {}
  // You need both to get the behavior you want.
  export interface TypeBackground extends ExtraTypeBackground {}
}

/**
 * Adding on extra theme properties
 */
declare module '@mui/material/styles' {
  // This controls what appears when you use the theme variable inside sx, styled, etc.
  interface Theme extends ExtraTheme {}
  // This controls what you are allowed to specify in `createTheme`.
  interface ThemeOptions extends ExtraTheme {}
  // You need both to get the behavior you want.
}
