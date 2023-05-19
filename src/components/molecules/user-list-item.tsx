import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ReactNode, useMemo, useState } from 'react';

import { AvatarFile } from '@/components/atoms/avatar-file';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/providers/auth';
import { Users } from '@/services/hasura/types';
import { PartialDeep } from 'type-fest';

import {
  ListItem,
  ListItemAvatar,
  Link as MUILink,
  Stack,
  ListItemProps,
  Typography,
  Avatar,
} from '@mui/material';

const FollowButtonUser = dynamic<any>(
  () =>
    import('@/components/atoms/follow-button-user').then(
      (mod) => mod.FollowButtonUser
    ),
  {
    ssr: false,
  }
);

type Props = {
  user: PartialDeep<Users>;
  hasLink?: boolean;
  hasUsernamePrefix?: boolean;
  showFollow?: boolean;
  icon?: ReactNode;
} & ListItemProps;

export function UserListItem({
  user,
  showFollow = true,
  hasLink = true,
  hasUsernamePrefix = true,
  icon,
  ...props
}: Props) {
  const { me } = useAuth();
  const url = ROUTES.PROFILE.replace('[username]', user.username);

  const [nameDisplay, setNameDisplay] = useState('');

  const avatarIcon = useMemo(() => {
    if (icon) {
      return hasLink ? (
        <Link passHref href={url}>
          <Avatar component="a" target="_blank">
            {icon}
          </Avatar>
        </Link>
      ) : (
        <Avatar>{icon}</Avatar>
      );
    }
    return hasLink ? (
      <Link passHref href={url}>
        <AvatarFile
          component="a"
          file={user.picture}
          target="_blank"
          fallback="/avatar.png"
        />
      </Link>
    ) : (
      <AvatarFile file={user.picture} target="_blank" fallback="/avatar.png" />
    );
  }, [hasLink, icon, url, user.picture]);

  function checkNameSize(name: string) {
    if (name.length > 11) {
      return name.slice(0, 10) + '...';
    }
    return name;
  }

  window.addEventListener('resize', () => {
    if (window.screen.width < 376) {
      setNameDisplay('slice');
    } else {
      setNameDisplay('full');
    }
  });

  return (
    <ListItem
      secondaryAction={
        showFollow && me?.wallet !== user.wallet ? (
          <FollowButtonUser wallet={user.wallet} variant="outlined" />
        ) : undefined
      }
      {...props}
    >
      <ListItemAvatar>{avatarIcon}</ListItemAvatar>
      <Stack direction="column" minWidth={0}>
        {hasLink ? (
          <>
            <Link passHref href={url}>
              <MUILink color="text.primary" underline="hover" target="_blank">
                {nameDisplay === 'slice' ? checkNameSize(user.name) : user.name}
              </MUILink>
            </Link>
            <Link passHref href={url}>
              <MUILink
                variant="body2"
                color="text.secondary"
                underline="hover"
                target="_blank"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {hasUsernamePrefix ? `@${user.username}` : user.username}
              </MUILink>
            </Link>
          </>
        ) : (
          <>
            <Typography color="text.primary">{user.name}</Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {hasUsernamePrefix ? `@${user.username}` : user.username}
            </Typography>
          </>
        )}
      </Stack>
    </ListItem>
  );
}
