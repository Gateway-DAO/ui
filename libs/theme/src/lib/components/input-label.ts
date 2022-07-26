import { Theme } from '@mui/material/styles';

/**
 * Example of a customized component
 */

export const MuiInputLabel: Extract<
  Theme['components'],
  object
>['MuiInputLabel'] = {
  defaultProps: {
    required: false,
    sx: {
      '&.Mui-focused, &.MuiFormLabel-filled, &.MuiInputLabel-shrink': {
        textTransform: 'uppercase',
      },
    },
  },
};
