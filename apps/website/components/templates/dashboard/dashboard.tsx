import { PropsWithChildren } from 'react';

import { MotionBox } from '@gateway/ui';

import Box from '@mui/material/Box';

import { useNav } from '../../../hooks/use-nav';
import { Drawer } from './drawer';
import { withGradientAfter } from './styles';
import { DashboardTemplateProps } from './types';
// eslint-disable-next-line @typescript-eslint/ban-types

/* TODO: buttons to next/link */

export function DashboardTemplate({
  followingDaos,
  currentDao,
  children,
  containerProps,
  showExplore = true,
}: PropsWithChildren<DashboardTemplateProps>) {
  const { isOpen } = useNav();

  return (
    <MotionBox
      sx={{
        display: 'flex',
        flex: 1,
        width: '100%',
        position: 'relative',
        zIndex: 1,
        ':after': withGradientAfter,
      }}
      animate={
        isOpen
          ? { overflowX: 'hidden' }
          : {
              overflowX: 'visible',
              transition: {
                delay: 0.225,
              },
            }
      }
    >
      <Drawer {...{ followingDaos, currentDao, showExplore }} />
      <Box
        component="main"
        {...containerProps}
        sx={[
          containerProps?.sx as any,
          (theme) => ({
            flexGrow: 1,
            [theme.breakpoints.down('md')]: {
              transition: 'transform 225ms ease-out',
            },
          }),
          isOpen &&
            ((theme) => ({
              [theme.breakpoints.down('md')]: {
                transform: (theme) => `translateX(${theme.spacing(9)})`,
              },
            })),
        ]}
      >
        {children}
      </Box>
    </MotionBox>
  );
}

export default DashboardTemplate;
