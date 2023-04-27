import { ReactNode } from 'react';

import { brandColors } from '@gateway/theme';

import { Typography, Button } from '@mui/material';

type Props = {
  clickHandler: (event) => void;
  label: string;
  children: ReactNode;
  fullWidth?: boolean;
};

export default function SquareButton({
  clickHandler,
  label,
  children,
  fullWidth,
}: Props) {
  return (
    <Button
      onClick={(e) => clickHandler(e)}
      sx={{
        borderRadius: 1,
        background: 'rgba(229, 229, 229, 0.08)',
        textDecoration: 'none',
        textAlign: 'center',
        width: fullWidth ? '100%' : { xs: '100%', sm: '80px' },
        height: fullWidth ? { xs: '56px', sm: '80px' } : '80px',
        display: 'flex',
        justifyContent: fullWidth ? { xs: 'start', sm: 'center' } : 'center',
        alignItems: 'center',
        flexDirection: fullWidth ? { xs: 'row', sm: 'column' } : 'column',
        textTransform: 'capitalize',
        '&:hover': {
          background: 'rgba(229, 229, 229, 0.15)',
        },
      }}
    >
      {children}
      <Typography
        fontSize={12}
        sx={{
          color: brandColors.white.main,
          textDecoration: 'none',
          mt: fullWidth ? { xs: 0, sm: 0.5 } : 0.5,
          ml: fullWidth ? { xs: 2.5, sm: 0 } : 0,
        }}
      >
        {label}
      </Typography>
    </Button>
  );
}
