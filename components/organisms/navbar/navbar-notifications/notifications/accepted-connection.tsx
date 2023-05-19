import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

import { PartialDeep } from 'type-fest';

import { Box, Stack, Typography } from '@mui/material';

import { ROUTES } from '@/constants/routes';
import { Users } from '@/services/hasura/types';
import { AvatarFile } from '../../../../atoms/avatar-file';

type Props = {
  isLast?: boolean;
  user: PartialDeep<Users>;
  hasRead: boolean;
  onRead: () => void;
};

export function AcceptedConnectionNotification({
  hasRead,
  isLast,
  user,
  onRead,
}: Props) {
  const { t } = useTranslation('notifications');

  const profileUrl = ROUTES.PROFILE.replace('[username]', user.username);

  return (
    <Stack
      component="div"
      direction="row"
      gap={2}
      alignItems="center"
      sx={[
        { px: 2, pt: 0.5, pb: !isLast ? 1.75 : 4 },
        !hasRead && { backgroundColor: '#9A53FF29' },
      ]}
      onMouseEnter={onRead}
      onFocusCapture={onRead}
    >
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
              <Typography component="span" sx={{ textDecoration: 'underline' }}>
                {user.username}
              </Typography>
            </Typography>
          </Link>{' '}
          <Typography component="span" sx={{ opacity: 0.5 }}>
            {t('user-accepted')}
          </Typography>
        </Typography>
      </Box>
    </Stack>
  );
}
