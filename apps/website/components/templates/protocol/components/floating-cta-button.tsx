import { ReactNode } from 'react';

import { brandColors } from 'apps/website/theme';

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
  bgColor = 'rgba(154, 83, 255, 0.15)',
  bgColorHover = 'rgba(154, 83, 255, 0.3)',
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
          backdropFilter: 'blur(16px)',
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
