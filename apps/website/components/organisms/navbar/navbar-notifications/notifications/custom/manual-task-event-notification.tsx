import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';

import { Box, CircularProgress, Stack, Typography } from '@mui/material';

import { ROUTES } from '../../../../../../constants/routes';
import { useAuth } from '../../../../../../providers/auth';
import { ManualTaskEventType } from '../../../../../../types/tasks';
import { useTimeAgo } from '../../../../../../utils/time';
import { AvatarFile } from '../../../../../atoms/avatar-file';

type Props = {
  data: {
    event_type: ManualTaskEventType;
    gate_id: string;
    gate_name: string;
    target_id: string;
    issuer_id: string;
  };
  timestamp: string;
};

export function ManualTaskEventNotification({ data, timestamp }: Props) {
  const { gqlAuthMethods } = useAuth();
  const userInfo = useQuery(
    ['user', data.issuer_id],
    () => gqlAuthMethods.user_by_id({ id: data.issuer_id }),
    {
      select: ({ users_by_pk }) => users_by_pk,
    }
  );

  const timeAgo = useTimeAgo(timestamp);
  if (!userInfo.data) {
    return (
      <Stack direction="row" gap={2} alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }

  const gateUrl = ROUTES.GATE_PROFILE.replace('[id]', data.gate_id);
  const userUrl = ROUTES.PROFILE.replace('[username]', userInfo.data.username);

  return (
    <Stack direction="row" gap={2} alignItems="center">
      <Link passHref href={userUrl}>
        <AvatarFile
          file={userInfo.data.picture}
          component="a"
          target="_blank"
        />
      </Link>
      <Box>
        <Typography variant="body1">
          <Link passHref href={userUrl}>
            <Typography
              component="a"
              color="text.primary"
              target="_blank"
              sx={{ textDecoration: 'none' }}
            >
              <Typography component="span" sx={{ textDecoration: 'underline' }}>
                {userInfo.data.username}
              </Typography>
            </Typography>
          </Link>{' '}
          <Typography component="span" color="text.secondary">
            {data.event_type}
          </Typography>
          <Link passHref href={gateUrl}>
            <Typography
              component="a"
              color="text.primary"
              target="_blank"
              sx={{ textDecoration: 'none' }}
            >
              <Typography component="span" sx={{ textDecoration: 'underline' }}>
                {' '}
                {data.gate_name}
              </Typography>
            </Typography>
          </Link>{' '}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {timeAgo}
        </Typography>
      </Box>
    </Stack>
  );
}
