import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useState } from 'react';

import { Box, Stack, Typography } from '@mui/material';

import { ROUTES } from '../../../../../constants/routes';
import { useAuth } from '../../../../../providers/auth';
import { useTimeAgo } from '../../../../../utils/time';
import { AvatarFile } from '../../../../atoms/avatar-file';

type DataProps = {
  dao_name?: string;
  dao_img_url?: string;
  gate_id?: string;
  gate_name?: string;
};

type Props = {
  id: string;
  event_type: string;
  opened: boolean;
  timestamp: string;
  data: DataProps;
  isLast?: boolean;
  onRead?: () => void;
};

export function CustomNotification({
  id,
  event_type,
  opened,
  timestamp,
  isLast,
  data,
}: Props) {
  const { t } = useTranslation('gate-new');
  const timeAgo = useTimeAgo(timestamp);
  const { me } = useAuth();

  const daoProfileUrl = ROUTES.DAO_PROFILE.replace(
    '[slug]',
    data.dao_name?.toLowerCase()
  );
  const gateUrl = ROUTES.GATE_PROFILE.replace('[id]', data.gate_id);

  const [hasRead, setHasRead] = useState(opened);

  const onRead = async () => {
    if (!hasRead) {
      setHasRead(true);
      fetch('/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          queueUrl: process.env.NEXT_PUBLIC_READ_NOTIFICATIONS_QUEUE_URL,
          body: {
            user_id: me?.id,
            notification_id: id,
          },
        }),
      });
    }
  };

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
        <Link passHref href={daoProfileUrl}>
          <AvatarFile
            file={data.dao_img_url as any}
            component="a"
            target="_blank"
          />
        </Link>
        <Box>
          <Typography variant="body1">
            <Link passHref href={daoProfileUrl}>
              <Typography
                component="a"
                color="text.primary"
                target="_blank"
                sx={{ textDecoration: 'none' }}
              >
                <Typography
                  component="span"
                  sx={{ textDecoration: 'underline' }}
                >
                  {data.dao_name}
                </Typography>
              </Typography>
            </Link>{' '}
            <Typography component="span" sx={{ opacity: 0.5 }}>
              has published a new credential:
            </Typography>
            <Link passHref href={gateUrl}>
              <Typography
                component="a"
                color="text.primary"
                target="_blank"
                sx={{ textDecoration: 'none' }}
              >
                <Typography
                  component="span"
                  sx={{ textDecoration: 'underline' }}
                >
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
    </Stack>
  );
}
