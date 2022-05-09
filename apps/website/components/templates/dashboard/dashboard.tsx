import { useRouter } from 'next/router';
import { PropsWithChildren, useMemo } from 'react';

import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';

import { GatewayIcon } from '@gateway/assets';
import { MotionListItemButton, MotionTooltip } from '@gateway/ui';

import ExploreIcon from '@mui/icons-material/Explore';
import { Avatar, ListItemButton } from '@mui/material';
import Box, { BoxProps } from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ListItemIcon from '@mui/material/ListItemIcon';

import { Dao } from '../../../types/dao';
import { DaosList } from './daos-list';
import { withGradientAfter } from './styles';
import { TemporaryDao } from './temporary-dao';

// eslint-disable-next-line @typescript-eslint/ban-types
export type DashboardTemplateProps = {
  followingDaos?: Dao[];
  currentDao?: Dao;
  containerProps?: BoxProps;
};

/* TODO: buttons to next/link */

export function DashboardTemplate({
  followingDaos,
  currentDao,
  children,
  containerProps,
}: PropsWithChildren<DashboardTemplateProps>) {
  /* Checks if currentDao isn't in followingDaos */
  const isCurrentDaoTemporary = useMemo(() => {
    if (!currentDao) {
      return false;
    }
    if (followingDaos) {
      return !followingDaos.find((dao) => dao.id === currentDao.id);
    }
    return true;
  }, [currentDao, followingDaos]);

  const router = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        position: 'relative',
        zIndex: 1,
        ':after': withGradientAfter,
      }}
    >
      <Box
        component="nav"
        sx={{ flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          color="transparent"
          sx={{
            height: '100%',
            '& .MuiDrawer-paper': {
              pt: 2,
              position: 'relative',
              background: 'transparent',
            },
          }}
          open
        >
          <DaosList>
            <AnimatePresence>
              <MotionListItemButton
                key="profile"
                layoutId="profile"
                aria-label="Go to Profile"
                sx={{ mb: 2.75 }}
                className={clsx({ active: router.pathname === '/' })}
              >
                <ListItemIcon>
                  <Avatar sx={{ background: 'transparent' }}>
                    <GatewayIcon />
                  </Avatar>
                </ListItemIcon>
              </MotionListItemButton>
              {!!currentDao && isCurrentDaoTemporary && (
                <TemporaryDao key={currentDao.id} dao={currentDao} />
              )}
              {followingDaos?.map((dao) => (
                <MotionTooltip
                  key={dao.id}
                  layoutId={dao.id}
                  title={dao.name}
                  placement="right"
                >
                  <ListItemButton
                    aria-label={`Go to ${dao.name}`}
                    className={clsx({ active: dao.id === currentDao?.id })}
                  >
                    <ListItemIcon>
                      <Avatar src={dao.image}>{dao.name[0]}</Avatar>
                    </ListItemIcon>
                  </ListItemButton>
                </MotionTooltip>
              ))}
              <MotionTooltip
                key="explore"
                layoutId="Explore"
                title="Explore"
                placement="right"
              >
                <ListItemButton>
                  <ListItemIcon>
                    <Avatar>
                      <ExploreIcon />
                    </Avatar>
                  </ListItemIcon>
                </ListItemButton>
              </MotionTooltip>
            </AnimatePresence>
          </DaosList>
        </Drawer>
      </Box>
      <Box
        component="main"
        {...containerProps}
        sx={{ ...containerProps?.sx, flexGrow: 1 }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default DashboardTemplate;
