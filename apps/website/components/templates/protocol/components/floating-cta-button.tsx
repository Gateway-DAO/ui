import { ReactNode } from 'react';

import { brandColors } from '@gateway/theme';

import { IconButton } from '@mui/material';

type Props = {
  children: ReactNode;
  handlerClick: () => void;
  bgColor?: string;
  bgColorHover?: string;
  color?: string;
};

export default function FloatingCtaButton({
  children,
  handlerClick,
  bgColor = '#1D0836',
  bgColorHover = '#3A1374',
  color = brandColors.purple.main,
}: Props) {
  return (
    <>
      <IconButton
        size="large"
        onClick={() => handlerClick()}
        sx={{
          width: '56px',
          height: '56px',
          backgroundColor: bgColor,
          color: color,
          '&:hover': {
            backgroundColor: bgColorHover,
          },
        }}
      >
        {children}
      </IconButton>
    </>
  );
}
