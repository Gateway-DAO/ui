import { ReactNode } from 'react';

import { brandColors } from '@/theme';

import { Alert, alpha } from '@mui/material';

type Props = {
  children: ReactNode;
  severity: 'error' | 'warning' | 'info' | 'success';
};

export const AlertCustom = ({ children, severity }: Props) => (
  <Alert
    severity={severity}
    color="error"
    variant="filled"
    sx={{
      background: alpha(brandColors.purple.main, 0.08),
      border: `1px solid ${brandColors.purple.main}`,
      color: brandColors.purple.main,
      fontSize: 14,
    }}
  >
    {children}
  </Alert>
);
