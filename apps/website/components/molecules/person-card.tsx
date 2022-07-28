import type { PartialDeep } from 'type-fest';

import { Avatar, Button, CardHeader } from '@mui/material';
import MUICard from '@mui/material/Card';

import { useAuth } from '../../providers/auth';
import { Users } from '../../services/graphql/types.generated';
import { AvatarFile } from '../atoms/avatar-file';
import { FollowButtonUser } from '../atoms/follow-button-user';

/* TODO: Arias and Labels */
/* TODO: Clamp text */
export function PersonCard({
  id,
  name,
  username,
  picture,
}: PartialDeep<Users>) {
  const { me } = useAuth();
  return (
    <MUICard>
      <CardHeader
        sx={{
          '.MuiCardHeader-action': { alignSelf: 'unset', marginLeft: 2 },
          '.MuiCardHeader-content': { minWidth: 0 },
        }}
        avatar={
          <AvatarFile
            sx={{
              width: 40,
              height: 40,
            }}
            aria-label={name}
            file={picture}
            fallback="/logo.png"
          >
            {name?.[0]}
          </AvatarFile>
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
