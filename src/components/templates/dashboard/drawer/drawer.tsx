import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { AdminBadge } from '@/components/atoms/admin-badge';
import { AvatarFile } from '@/components/atoms/avatar-file';
import { GatewayIcon } from '@/components/atoms/icons';
import { AddOrganizationIcon } from '@/components/atoms/icons/add-organization-icon';
import { ROUTES } from '@/constants/routes';
import { useCreateOrgCardProps } from '@/hooks/use-create-org-card-props';
import { useAuth } from '@/providers/auth';
import clsx from 'clsx';
import { useToggle } from 'react-use';

import ExploreIcon from '@mui/icons-material/Explore';
import { Avatar, ListItemButton, Stack } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';

import OrgSignupDialog from '../../org/signup/dialog-structure';
import { DashboardTemplateProps } from '../types';
import { DaosList } from './daos-list';
import { DrawerContainer } from './drawer-container';
import { ResponsiveDrawer } from './responsive-drawer';

type Props = Pick<DashboardTemplateProps, 'currentDao' | 'showExplore'>;

export function Drawer({ currentDao, showExplore }: Props) {
  const router = useRouter();

  const { me } = useAuth();

  const [openSignUpOrgDialog, setSignUpOrgDialog] = useToggle(false);

  const followingDaos = useMemo(
    () => me?.following_dao?.map(({ dao }) => dao) ?? [],
    [me?.following_dao]
  );

  const createOrgCardProps = useCreateOrgCardProps({
    action: setSignUpOrgDialog,
  });

  return (
    <DrawerContainer>
      <OrgSignupDialog
        open={openSignUpOrgDialog}
        toggleDialog={setSignUpOrgDialog}
      />
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
          <Stack
            sx={{
              my: 1,
              px: 2,
              alignItems: 'center',
              justifyContent: 'center',
              height: (theme) => theme.spacing(5),
              cursor: 'pointer',
              position: 'relative',
              background: 'none transparent',
              border: 0,
              transition: 'opacity .3s ease',
              '&:hover': {
                opacity: 0.8,
              },
            }}
            {...createOrgCardProps}
          >
            <AddOrganizationIcon />
          </Stack>
        </DaosList>
      </ResponsiveDrawer>
    </DrawerContainer>
  );
}
