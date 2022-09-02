import { Fragment } from 'react';

import { PartialDeep } from 'type-fest';

import { Divider, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

import { useAuth } from '../../../../providers/auth';
import { Users } from '../../../../services/graphql/types.generated';
import { AvatarFile } from '../../../atoms/avatar-file';
import { FollowButtonUser } from '../../../atoms/follow-button-user';

type Props = {
  users: PartialDeep<Users>[];
};

export function UsersList({ users }: Props) {
  const { me } = useAuth();
  return (
    <>
      {users.map((user, index) => (
        <Fragment key={index}>
          <ListItem
            secondaryAction={
              me?.wallet !== user.wallet ? (
                <FollowButtonUser wallet={user.wallet} variant="outlined" />
              ) : undefined
            }
          >
            <ListItemAvatar>
              <AvatarFile file={user.picture} />
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={`@${user.username}`} />
          </ListItem>
          {index !== users.length - 1 && <Divider component="li" />}
        </Fragment>
      ))}
    </>
  );
}
