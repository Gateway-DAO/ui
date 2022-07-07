import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';

import { GatewayIcon } from '@gateway/assets';
import { MotionTooltip } from '@gateway/ui';

import ExploreIcon from '@mui/icons-material/Explore';
import { Avatar, ListItemButton } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';

import { ROUTES } from '../../../../constants/routes';
import { useAuth } from '../../../../providers/auth';
import { DashboardTemplateProps } from '../types';
import { DaosList } from './daos-list';
import { DrawerContainer } from './drawer-container';
import { ResponsiveDrawer } from './responsive-drawer';
import { TemporaryDao } from './temporary-dao';

type Props = Pick<DashboardTemplateProps, 'currentDao' | 'showExplore'>;

export function Drawer({ currentDao, showExplore }: Props) {
  const router = useRouter();

  const { me } = useAuth();

  const followingDaos = me?.following_dao?.map(({ dao }) => dao) ?? [];

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

  return (
    <DrawerContainer>
      <ResponsiveDrawer>
        <DaosList>
          <ListItemIcon
            sx={{
              mb: 2.75,
              px: 2,
              alignItems: 'center',
              justifyContent: 'center',
              height: (theme) => theme.spacing(5),
            }}
          >
            <GatewayIcon />
          </ListItemIcon>
          <AnimatePresence>
            {!!currentDao && isCurrentDaoTemporary && (
              <TemporaryDao key={currentDao.id} dao={currentDao} />
            )}
            {followingDaos?.map((dao) => {
              const url = ROUTES.DAO_PROFILE.replace('[id]', dao.id);

              return (
                <Link key={dao.id} passHref href={url} prefetch={false}>
                  <MotionTooltip
                    layoutId={dao.id}
                    title={dao.name}
                    placement="right"
                  >
                    <ListItemButton
                      component="a"
                      aria-label={`Go to ${dao.name}`}
                      className={clsx({ active: dao.id === currentDao?.id })}
                    >
                      <ListItemIcon>
                        <Avatar src={dao?.logo_url}>{dao.name?.[0]}</Avatar>
                      </ListItemIcon>
                    </ListItemButton>
                  </MotionTooltip>
                </Link>
              );
            })}
          </AnimatePresence>
          {showExplore && (
            <Link passHref href={ROUTES.EXPLORE} prefetch={false}>
              <MotionTooltip
                key="explore"
                layoutId="Explore"
                title="Explore"
                placement="right"
                className={clsx({
                  active: router.pathname === ROUTES.EXPLORE,
                })}
              >
                <ListItemButton component="a">
                  <ListItemIcon>
                    <Avatar>
                      <ExploreIcon />
                    </Avatar>
                  </ListItemIcon>
                </ListItemButton>
              </MotionTooltip>
            </Link>
          )}
        </DaosList>
      </ResponsiveDrawer>
    </DrawerContainer>
  );
}
