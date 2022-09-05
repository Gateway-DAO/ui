import Link from 'next/link';
import { Fragment } from 'react';

import { PartialDeep } from 'type-fest';

import {
  Divider,
  ListItem,
  ListItemAvatar,
  Link as MUILink,
  Stack,
} from '@mui/material';

import { ROUTES } from '../../../../constants/routes';
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
      {users.map((user, index) => {
        const url = ROUTES.PROFILE.replace('[username]', user.username);
        return (
          <Fragment key={index}>
            <ListItem
              secondaryAction={
                me?.wallet !== user.wallet ? (
                  <FollowButtonUser wallet={user.wallet} variant="outlined" />
                ) : undefined
              }
            >
              <ListItemAvatar>
                <Link passHref href={url}>
                  <AvatarFile
                    component="a"
                    file={user.picture}
                    target="_blank"
                  />
                </Link>
              </ListItemAvatar>
              <Stack direction="column">
                <Link passHref href={url}>
                  <MUILink
                    color="text.primary"
                    underline="hover"
                    target="_blank"
                  >
                    {user.name}
                  </MUILink>
                </Link>
                <Link passHref href={url}>
                  <MUILink
                    variant="body2"
                    color="text.secondary"
                    underline="hover"
                    target="_blank"
                  >
                    {`@${user.username}`}
                  </MUILink>
                </Link>
              </Stack>
            </ListItem>
            {index !== users.length - 1 && <Divider component="li" />}
          </Fragment>
        );
      })}
    </>
  );
}
