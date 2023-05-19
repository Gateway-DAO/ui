import { PropsWithChildren } from 'react';

import { Hidden, useMediaQuery, useTheme } from '@mui/material';
import Drawer, { DrawerProps } from '@mui/material/Drawer';

import { useNav } from '@/hooks/use-nav';

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
        '*::-webkit-scrollbar': {
          width: '0.2em',
        },
        '&:hover': {
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderRadius: 10,
          },
        },

        height: '100vh',
        overflow: 'hidden',
        marginLeft: (theme) => `calc(${theme.spacing(9)} + 1px)`,
        '& .MuiDrawer-paper': {
          pt: 0,
          background: 'transparent',
        },
        [theme.breakpoints.up('md')]: {
          '& .MuiDrawer-paper': {
            position: 'fixed',
            overflowY: 'auto',
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
