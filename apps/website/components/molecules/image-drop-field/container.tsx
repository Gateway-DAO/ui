import { PropsWithChildren } from 'react';

import { DropAreaBond } from 'react-use/lib/useDrop';

import { Box } from '@mui/material';
type Props = {
  hasImage?: boolean;
  isOver?: boolean;
  dropBond: DropAreaBond;
};

export function Container({
  dropBond,
  children,
  hasImage,
  isOver,
}: PropsWithChildren<Props>) {
  return (
    <Box
      component="label"
      sx={[
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          position: 'relative',
          transition: 'background-color 0.2s ease-in-out',
        },
        !hasImage && {
          border: '1px dashed',
          borderColor: (theme) => theme.palette.primary.main,
        },
        isOver && {
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        },
      ]}
      {...dropBond}
      tabIndex={0}
    >
      {children}
    </Box>
  );
}
