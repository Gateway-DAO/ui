import { ListItem, ListItemAvatar, Stack } from '@mui/material';
import { Fragment } from 'react';
import { AvatarFile } from '../../atoms/avatar-file';
import { FollowButtonUser } from '../../atoms/follow-button-user';
import Link from 'next/link';
import { Link as MUILink } from '@mui/material';
import { ROUTES } from 'apps/website/constants/routes';

export const UserList = ({ holder, index, me }) => {
  const url = ROUTES.PROFILE.replace('[username]', holder.username);
  return (
    <Fragment key={index}>
      <ListItem
        secondaryAction={
          me?.wallet !== holder.wallet ? (
            <FollowButtonUser wallet={holder.wallet} variant="outlined" />
          ) : undefined
        }
      >
        <ListItemAvatar>
          <Link passHref href={url}>
            <AvatarFile
              component="a"
              file={holder.picture}
              target="_blank"
              fallback="/avatar.png"
            />
          </Link>
        </ListItemAvatar>
        <Stack direction="column">
          <Link passHref href={url}>
            <MUILink color="text.primary" underline="hover" target="_blank">
              {holder.name}
            </MUILink>
          </Link>
          <Link passHref href={url}>
            <MUILink
              variant="body2"
              color="text.secondary"
              underline="hover"
              target="_blank"
            >
              {`@${holder.username}`}
            </MUILink>
          </Link>
        </Stack>
      </ListItem>
    </Fragment>
  );
};
