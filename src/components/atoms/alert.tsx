import { ReactNode } from 'react';

import { brandColors } from '@/theme';

import { Alert, alpha } from '@mui/material';

type Props = {
  children: ReactNode;
  severity: 'error' | 'warning' | 'info' | 'success';
  fixed?: boolean;
};

export const AlertCustom = ({ children, severity, fixed }: Props) => (
  <Alert
    severity={severity}
    color="error"
    variant="filled"
    elevation={fixed ? 3 : 0}
    sx={{
      background: fixed
        ? brandColors.background.light
        : alpha(brandColors.purple.main, 0.08),
      border: fixed ? 'none' : `1px solid ${brandColors.purple.main}`,
      color: brandColors.purple.main,
      fontSize: 14,
      position: fixed ? 'fixed' : 'initial',
      width: fixed ? '100%' : 'auto',
      borderRadius: fixed ? '0px' : '8px',
      justifyContent: fixed ? 'center' : 'initial',
      zIndex: fixed ? '10' : 'auto',
    }}
  >
    {children}
  </Alert>
);
