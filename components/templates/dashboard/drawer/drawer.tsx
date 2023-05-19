import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { GatewayIcon } from '@/components/atoms/icons';
import clsx from 'clsx';

import ExploreIcon from '@mui/icons-material/Explore';
import { Avatar, ListItemButton } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';

import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/providers/auth';
import { AdminBadge } from '@/components/atoms/admin-badge';
import { AvatarFile } from '@/components/atoms/avatar-file';
import { DashboardTemplateProps } from '../types';
import { DaosList } from './daos-list';
import { DrawerContainer } from './drawer-container';
import { ResponsiveDrawer } from './responsive-drawer';

type Props = Pick<DashboardTemplateProps, 'currentDao' | 'showExplore'>;

export function Drawer({ currentDao, showExplore }: Props) {
  const router = useRouter();

  const { me } = useAuth();

  const followingDaos = useMemo(
    () => me?.following_dao?.map(({ dao }) => dao) ?? [],
    [me?.following_dao]
  );

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
            <Link passHref href={ROUTES.EXPLORE}>
              <a>
                <GatewayIcon />
              </a>
            </Link>
          </ListItemIcon>
          {showExplore && (
            <Link passHref href={ROUTES.EXPLORE}>
              <ListItemButton
                component="a"
                title="Explore"
                className={clsx({
                  active: router.pathname === ROUTES.EXPLORE,
                })}
              >
                <ListItemIcon>
                  <Avatar>
                    <ExploreIcon />
                  </Avatar>
                </ListItemIcon>
              </ListItemButton>
            </Link>
          )}
          {followingDaos?.map((dao) => {
            const url = ROUTES.DAO_PROFILE.replace('[slug]', dao.slug);

            return (
              <Link key={dao.id} passHref href={url}>
                <ListItemButton
                  title={dao.name}
                  component="a"
                  aria-label={`Go to ${dao.name}`}
                  className={clsx({ active: dao.id === currentDao?.id })}
                >
                  <ListItemIcon>
                    <AdminBadge isAdmin={dao.is_admin}>
                      <AvatarFile file={dao?.logo} fallback={dao?.logo_url}>
                        {dao.name?.[0]}
                      </AvatarFile>
                    </AdminBadge>
                  </ListItemIcon>
                </ListItemButton>
              </Link>
            );
          })}
        </DaosList>
      </ResponsiveDrawer>
    </DrawerContainer>
  );
}
