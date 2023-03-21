import { ReactNode } from 'react';

import { brandColors } from '@gateway/theme';

import { Typography, Button } from '@mui/material';

type Props = {
  clickHandler: (event) => void;
  label: string;
  children: ReactNode;
};

export default function SquareButton({ clickHandler, label, children }: Props) {
  return (
    <Button
      onClick={(e) => clickHandler(e)}
      sx={{
        borderRadius: 1,
        background: 'rgba(229, 229, 229, 0.08)',
        textDecoration: 'none',
        textAlign: 'center',
        width: '80px',
        height: '80px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textTransform: 'capitalize',
        '&:hover': {
          background: 'rgba(229, 229, 229, 0.15)',
        },
      }}
    >
      {children}
      <Typography
        fontSize={12}
        sx={{ color: brandColors.white.main, textDecoration: 'none', mt: 0.5 }}
      >
        {label}
      </Typography>
    </Button>
  );
}
