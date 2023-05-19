import Link from 'next/link';

import { AvatarFile } from '@/components/atoms/avatar-file';
import { ROUTES } from '@/constants/routes';
import { useTimeAgo } from '@/utils/time';

import { Box, Stack, Typography } from '@mui/material';

type DataProps = {
  dao_name?: string;
  dao_img_url?: string;
  gate_id?: string;
  gate_name?: string;
};

type Props = {
  data: DataProps;
  timestamp: string;
};

export function GatePublishedNotification({ data, timestamp }: Props) {
  const timeAgo = useTimeAgo(timestamp);

  const daoProfileUrl = ROUTES.DAO_PROFILE.replace(
    '[slug]',
    data?.dao_name?.toLowerCase()
  );
  const gateUrl = ROUTES.GATE_PROFILE.replace('[id]', data?.gate_id);

  return (
    <Stack direction="row" gap={2} alignItems="center">
      <Link passHref href={daoProfileUrl}>
        <AvatarFile
          file={data?.dao_img_url as any}
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
              <Typography component="span" sx={{ textDecoration: 'underline' }}>
                {data?.dao_name}
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
              <Typography component="span" sx={{ textDecoration: 'underline' }}>
                {' '}
                {data?.gate_name}
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