import { PropsWithChildren } from 'react';

import { useMediaQuery, useTheme } from '@mui/material';
import Drawer, { DrawerProps } from '@mui/material/Drawer';

import { useNav } from '../../../../hooks/use-nav';

export const ResponsiveDrawer = ({ children }: PropsWithChildren<unknown>) => {
  const { isOpen, onClose } = useNav();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const container =
    typeof window !== 'undefined' ? () => window.document.body : undefined;

  const mobileProps: DrawerProps = {
    container,
    variant: 'temporary',
    open: isOpen,
    onClose,
    ModalProps: {
      keepMounted: true, // Better open performance on mobile.
    },
  };

  const desktopProps: DrawerProps = {
    open: true,
    variant: 'permanent',
  };

  return (
    <Drawer
      color="transparent"
      sx={(theme) => ({
        height: '100%',
        '& .MuiDrawer-paper': {
          pt: 2,
          background: 'transparent',
        },
        [theme.breakpoints.up('md')]: {
          '& .MuiDrawer-paper': {
            position: 'relative',
          },
        },
        [theme.breakpoints.down('md')]: {
          '.MuiBackdrop-root': {
            background: 'transparent',
          },
          '& .MuiDrawer-paper': {
            borderRight: 1,
            borderColor: theme.palette.divider,
          },
        },
      })}
      {...(isMobile ? mobileProps : desktopProps)}
    >
      {children}
    </Drawer>
  );
};
