import type { PartialDeep } from 'type-fest';

import { Avatar, Button, CardHeader } from '@mui/material';
import MUICard from '@mui/material/Card';

import { Users } from '../../services/graphql/types.generated';

/* TODO: Arias and Labels */
/* TODO: Clamp text */
export function PersonCard({ name, about, pfp }: PartialDeep<Users>) {
  return (
    <MUICard>
      <CardHeader
        sx={{ '.MuiCardHeader-action': { alignSelf: 'unset' } }}
        avatar={
          <Avatar
            sx={{
              width: 40,
              height: 40,
            }}
            aria-label="recipe"
            src={pfp}
          >
            {name[0]}
          </Avatar>
        }
        action={
          <Button variant="outlined" size="small" color="secondary">
            Connect
          </Button>
        }
        title={name}
        subheader={about}
      />
    </MUICard>
  );
}
