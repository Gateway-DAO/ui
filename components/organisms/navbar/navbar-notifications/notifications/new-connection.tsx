import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

import { PartialDeep } from 'type-fest';

import { Box, Button, Stack, Typography } from '@mui/material';

import { ROUTES } from '@/constants/routes';
import { Users } from '@/services/hasura/types';
import { useTimeAgo } from '../../../../../utils/time';
import { AvatarFile } from '../../../../atoms/avatar-file';

type Props = {
  isLast?: boolean;
  user: PartialDeep<Users>;
  hasRead: boolean;
  onRead: () => void;
  timestamp: string;
  isLoading: boolean;
  onAccept: () => void;
  onReject: () => void;
};

export function NewConnectionNotification({
  hasRead,
  isLast,
  timestamp,
  user,
  onRead,
  isLoading,
  onAccept,
  onReject,
}: Props) {
  const { t } = useTranslation('notifications');
  const timeAgo = useTimeAgo(timestamp);

  const profileUrl = ROUTES.PROFILE.replace('[username]', user.username);

  return (
    <Stack
      component="div"
      direction="column"
      gap={1.75}
      sx={[
        { px: 2, pt: 0.5, pb: !isLast ? 1.75 : 4 },
        !hasRead && { backgroundColor: '#9A53FF29' },
      ]}
      onMouseEnter={onRead}
      onFocusCapture={onRead}
    >
      <Stack direction="row" gap={2} alignItems="center">
        <Link passHref href={profileUrl}>
          <AvatarFile
            file={user.picture}
            fallback="/avatar.png"
            component="a"
            target="_blank"
          />
        </Link>
        <Box>
          <Typography variant="body1">
            <Link passHref href={profileUrl}>
              <Typography
                component="a"
                color="text.primary"
                target="_blank"
                sx={{ textDecoration: 'none' }}
              >
                @
                <Typography
                  component="span"
                  sx={{ textDecoration: 'underline' }}
                >
                  {user.username}
                </Typography>
              </Typography>
            </Link>{' '}
            <Typography component="span" sx={{ opacity: 0.5 }}>
              {t('user-requested')}
            </Typography>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {timeAgo}
          </Typography>
        </Box>
      </Stack>
      <Stack direction="row" gap={1} sx={{ pl: 6.75 }}>
        <Button disabled={isLoading} onClick={onAccept} variant="contained">
          {t('common:actions.accept')}
        </Button>
        <Button disabled={isLoading} onClick={onReject} variant="outlined">
          {t('common:actions.decline')}
        </Button>
      </Stack>
    </Stack>
  );
}
