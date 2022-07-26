import { Theme } from '@mui/material/styles';

/**
 * Example of a customized component
 */

export const MuiInputBase: Extract<
  Theme['components'],
  object
>['MuiInputBase'] = {
  defaultProps: {
    sx: {
      '&.MuiInputBase-multiline': {
        minHeight: '176px',
      },
      '&.MuiInputBase-multiline .MuiInputBase-inputMultiline': {
        minheight: '176px',
        height: '143px !important',
      },
    },
  },
};
