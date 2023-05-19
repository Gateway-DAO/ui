import { PropsWithChildren } from 'react';

import Box from '@mui/material/Box';

import { useNav } from '@/hooks/use-nav';

export function DrawerContainer({ children }: PropsWithChildren<unknown>) {
  const { isOpen } = useNav();
  return (
    <Box
      component="nav"
      sx={[
        (theme) => ({
          flexShrink: 0,
          backgroundColor: 'background.default',
          [theme.breakpoints.down('md')]: {
            position: 'absolute',
            zIndex: 3,
            top: 0,
            bottom: 0,
            transition: 'transform 225ms ease-in-out',
            transform: 'translateX(-100%)',
          },
        }),
        isOpen &&
          ((theme) => ({
            [theme.breakpoints.down('md')]: {
              transform: 'translateX(0)',
            },
          })),
      ]}
      aria-label="sidebar navigation"
    >
      {children}
    </Box>
  );
}
