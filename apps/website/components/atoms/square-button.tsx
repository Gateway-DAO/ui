import { ReactNode } from 'react';

import { brandColors } from '@gateway/theme';

import { Typography, Button } from '@mui/material';

type Props = {
  clickHandler: (event) => void;
  label: string;
  children: ReactNode;
  large?: boolean;
};

export default function SquareButton({
  clickHandler,
  label,
  children,
  large,
}: Props) {
  return (
    <Button
      onClick={(e) => clickHandler(e)}
      sx={{
        borderRadius: 1,
        background: 'rgba(229, 229, 229, 0.08)',
        textDecoration: 'none',
        textAlign: 'center',
        width: large ? { xs: '100%', sm: '120px' } : '80px',
        height: large ? { xs: '56px', sm: '80px' } : '80px',
        display: 'flex',
        justifyContent: large ? { xs: 'start', sm: 'center' } : 'center',
        alignItems: 'center',
        flexDirection: large ? { xs: 'row', sm: 'column' } : 'column',
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
          mt: large ? { xs: 0, sm: 0.5 } : 0.5,
          ml: large ? { xs: 2.5, sm: 0 } : 0,
        }}
      >
        {label}
      </Typography>
    </Button>
  );
}
