import dynamic from 'next/dynamic';
import Link from 'next/link';

import { PartialDeep } from 'type-fest';

import {
  ListItem,
  ListItemAvatar,
  Link as MUILink,
  Stack,
  ListItemProps,
  Typography,
} from '@mui/material';

import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../providers/auth';
import { Users } from '../../services/graphql/types.generated';
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
  hasLink?: boolean;
  hasUsernamePrefix?: boolean;
  showFollow?: boolean;
} & ListItemProps;

export function UserListItem({
  user,
  showFollow = true,
  hasLink = true,
  hasUsernamePrefix = true,
  ...props
}: Props) {
  const { me } = useAuth();
  const url = ROUTES.PROFILE.replace('[username]', user.username);

  return (
    <ListItem
      secondaryAction={
        showFollow && me?.wallet !== user.wallet ? (
          <FollowButtonUser wallet={user.wallet} variant="outlined" />
        ) : undefined
      }
      {...props}
    >
      <ListItemAvatar>
        {hasLink ? (
          <Link passHref href={url}>
            <AvatarFile
              component="a"
              file={user.picture}
              target="_blank"
              fallback="/avatar.png"
            />
          </Link>
        ) : (
          <AvatarFile
            file={user.picture}
            target="_blank"
            fallback="/avatar.png"
          />
        )}
      </ListItemAvatar>
      <Stack direction="column">
        {hasLink ? (
          <>
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
                {hasUsernamePrefix ? `@${user.username}` : user.username}
              </MUILink>
            </Link>
          </>
        ) : (
          <>
            <Typography color="text.primary">{user.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {hasUsernamePrefix ? `@${user.username}` : user.username}
            </Typography>
          </>
        )}
      </Stack>
    </ListItem>
  );
}
