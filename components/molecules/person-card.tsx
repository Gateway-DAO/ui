import dynamic from 'next/dynamic';
import Link from 'next/link';

import type { PartialDeep } from 'type-fest';

import { Box, CardActionArea, CardHeader } from '@mui/material';
import MUICard from '@mui/material/Card';

import { ROUTES } from '@/constants/routes';
import { useAuth } from '../../providers/auth';
import { Users } from '@/services/hasura/types';
import { AdminBadge } from '../atoms/admin-badge';
import { AvatarFile } from '../atoms/avatar-file';

const FollowButtonUser = dynamic<any>(
  () =>
    import('../atoms/follow-button-user').then((mod) => mod.FollowButtonUser),
  {
    ssr: false,
  }
);

type Props = {
  user: PartialDeep<Users>;
  isAdmin?: boolean;
};

/* TODO: Arias and Labels */
/* TODO: Clamp text */
export function PersonCard({
  user: { id, name, username, picture, wallet },
  isAdmin,
}: Props) {
  const url = ROUTES.PROFILE.replace('[username]', username);
  const { me } = useAuth();
  return (
    <MUICard sx={{ position: 'relative' }}>
      <Link passHref href={url}>
        <CardActionArea component="a" sx={{ height: '100%' }}>
          <CardHeader
            sx={{
              '.MuiCardHeader-action': { alignSelf: 'unset', marginLeft: 2 },
              '.MuiCardHeader-content': { minWidth: 0 },
            }}
            avatar={
              <AdminBadge isAdmin={isAdmin}>
                <AvatarFile file={picture} fallback="/avatar.png">
                  {name?.[0]}
                </AvatarFile>
              </AdminBadge>
            }
            title={name}
            subheader={`@${username}`}
            subheaderTypographyProps={{
              sx: {
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              },
            }}
          />
        </CardActionArea>
      </Link>
      {id !== me?.id ? (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            top: 0,
            right: 16,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <FollowButtonUser
            wallet={wallet}
            variant="outlined"
            size="small"
            color="secondary"
          />
        </Box>
      ) : null}
    </MUICard>
  );
}
