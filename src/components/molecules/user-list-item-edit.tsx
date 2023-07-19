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
  Chip,
} from '@mui/material';

const FollowButtonUser = dynamic<any>(
  () =>
    import('@/components/atoms/buttons/follow-button-user').then(
      (mod) => mod.FollowButtonUser
    ),
  {
    ssr: false,
  }
);

type Props = {
  recipientId: string;
  invalid: boolean;
} & ListItemProps;

export function UserListItemEdit({ recipientId, invalid, ...props }: Props) {
  const [nameDisplay, setNameDisplay] = useState('');
  console.log(props);
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
        <FollowButtonUser wallet={recipientId} variant="outlined" />
      }
      {...props}
    >
      <Stack direction="row" justifyContent={'space-between'} minWidth={0}>
        <>
          <Typography color="text.primary">{recipientId}</Typography>
          {invalid ? (
            <Chip variant="outlined" color="error" label="Invalid" />
          ) : (
            <Chip variant="outlined" color="success" label="Valid" />
          )}
        </>
      </Stack>
    </ListItem>
  );
}
