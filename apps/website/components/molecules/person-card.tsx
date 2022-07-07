import type { PartialDeep } from 'type-fest';

import { Avatar, Button, CardHeader } from '@mui/material';
import MUICard from '@mui/material/Card';

import { Users } from '../../services/graphql/types.generated';
import { FollowButtonUser } from '../atoms/follow-button-user';

/* TODO: Arias and Labels */
/* TODO: Clamp text */
export function PersonCard({ id, name, username, pfp }: PartialDeep<Users>) {
  return (
    <MUICard>
      <CardHeader
        sx={{
          '.MuiCardHeader-action': { alignSelf: 'unset', marginLeft: 2 },
          '.MuiCardHeader-content': { minWidth: 0 },
        }}
        avatar={
          <Avatar
            sx={{
              width: 40,
              height: 40,
            }}
            aria-label={name}
            src={pfp}
          >
            {name?.[0]}
          </Avatar>
        }
        action={
          <FollowButtonUser
            userId={id}
            variant="outlined"
            size="small"
            color="secondary"
          />
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
