import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

import { AvatarFile } from '@/components/atoms/avatar-file';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/providers/auth';
import { useTimeAgo } from '@/utils/time';
import { useQuery } from '@tanstack/react-query';

import { Box, CircularProgress, Stack, Typography } from '@mui/material';

type Props = {
  data: {
    issuer_user_id: string;
    issuer_org_id?: string;
    event_type: string;
    credential_id: string;
    credential_name: string;
  };
  timestamp: string;
};

export function ProtocolCredentialNotification({ data, timestamp }: Props) {
  const { hasuraUserService } = useAuth();
  const { t } = useTranslation('notifications');

  const userInfo = useQuery(
    ['user', data.issuer_user_id],
    () => hasuraUserService.user_by_id({ id: data.issuer_user_id }),
    {
      enabled: !!data.issuer_user_id && !data.issuer_org_id,
      select: ({ users_by_pk }) => ({
        ...users_by_pk,
        url: ROUTES.PROFILE.replace('[username]', users_by_pk.username),
      }),
    }
  );

  const orgInfo = useQuery(
    ['org', data.issuer_org_id],
    () => hasuraUserService.dao_info_by_id({ id: data.issuer_org_id }),
    {
      enabled: !!data.issuer_org_id,
      select: ({ daos_by_pk }) => ({
        ...daos_by_pk,
        url: ROUTES.DAO_PROFILE.replace('[slug]', daos_by_pk.slug),
      }),
    }
  );

  const timeAgo = useTimeAgo(timestamp);

  if (
    (!data.issuer_org_id && !userInfo.data) ||
    (data.issuer_org_id && !orgInfo.data)
  ) {
    return (
      <Stack direction="row" gap={2} alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }

  const credentialUrl = ROUTES.PROTOCOL_CREDENTIAL.replace(
    '[id]',
    data.credential_id
  );

  return (
    <Stack direction="row" gap={2} alignItems="center">
      <Link
        passHref
        href={orgInfo.data ? orgInfo.data.url : userInfo.data?.url}
      >
        <AvatarFile
          file={orgInfo.data ? orgInfo.data.logo : userInfo.data.picture}
          fallback={orgInfo.data?.logo_url}
          component="a"
          target="_blank"
        />
      </Link>
      <Box>
        <Typography variant="body1">
          <Link
            passHref
            href={orgInfo.data ? orgInfo.data.url : userInfo.data?.url}
          >
            <Typography
              component="a"
              color="text.primary"
              target="_blank"
              sx={{ textDecoration: 'none' }}
            >
              <Typography component="span" sx={{ textDecoration: 'underline' }}>
                {orgInfo.data ? orgInfo.data.name : userInfo.data.username}
              </Typography>
            </Typography>
          </Link>{' '}
          <Typography component="span" color="text.secondary">
            {t(`protocol_credential.${data.event_type}`)}{' '}
          </Typography>
          <Link passHref href={credentialUrl}>
            <Typography
              component="a"
              color="text.primary"
              target="_blank"
              sx={{ textDecoration: 'none' }}
            >
              <Typography component="span" sx={{ textDecoration: 'underline' }}>
                {data.credential_name}
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
