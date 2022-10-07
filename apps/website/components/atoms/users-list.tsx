import { Divider, ListItem, ListItemAvatar, Stack } from '@mui/material';
import Link from 'next/link';
import { Fragment } from 'react';
import { AvatarFile } from './avatar-file';
import { FollowButtonUser } from './follow-button-user';
import { Link as MUILink } from '@mui/material';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../providers/auth';

export const UserList = ({ user, index }) => {
  const { me } = useAuth();
  const url = ROUTES.PROFILE.replace('[username]', user.username);
  return (
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
            fallback="/avatar.png"
          />
        </Link>
      </ListItemAvatar>
      <Stack direction="column">
        <Link passHref href={url}>
          <MUILink color="text.primary" underline="hover" target="_blank">
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
  );
};
