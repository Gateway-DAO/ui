import type { PartialDeep } from 'type-fest';

import { CardHeader } from '@mui/material';
import MUICard from '@mui/material/Card';

import { useAuth } from '../../providers/auth';
import { Users } from '../../services/graphql/types.generated';
import { AdminBadge } from '../atoms/admin-badge';
import { AvatarFile } from '../atoms/avatar-file';
import { FollowButtonUser } from '../atoms/follow-button-user';

type Props = {
  user: PartialDeep<Users>;
  isAdmin?: boolean;
};

/* TODO: Arias and Labels */
/* TODO: Clamp text */
export function PersonCard({
  user: { id, name, username, picture },
  isAdmin,
}: Props) {
  const { me } = useAuth();
  return (
    <MUICard>
      <CardHeader
        sx={{
          '.MuiCardHeader-action': { alignSelf: 'unset', marginLeft: 2 },
          '.MuiCardHeader-content': { minWidth: 0 },
        }}
        avatar={
          <AdminBadge isAdmin={isAdmin}>
            <AvatarFile file={picture} fallback="/logo.png">
              {name?.[0]}
            </AvatarFile>
          </AdminBadge>
        }
        action={
          id !== me?.id ? (
            <FollowButtonUser
              userId={id}
              variant="outlined"
              size="small"
              color="secondary"
            />
          ) : null
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
    </MUICard>
  );
}
