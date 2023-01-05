import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

import { Stack, Typography } from '@mui/material';

import { ROUTES } from '../../../../../../../../constants/routes';
import Bullet from './bullet';

export function SubmissionWaiting({ username }: { username: string }) {
  const { t } = useTranslation('gate-profile');

  return (
    <Stack
      sx={(theme) => ({
        position: 'relative',
        pl: 3,
        pb: 4,
        width: '100%',
        borderLeft: `1px solid ${theme.palette.grey[700]}`,
      })}
    >
      <Bullet event_type="waiting" />
      <Stack direction="row" gap={0.5} sx={{ marginTop: -0.5 }}>
        <Typography
          fontSize={14}
          sx={(theme) => ({
            color: theme.palette.grey[500],
          })}
        >
          {t('submissions.waiting_feedback')}
        </Typography>
        <Link passHref href={ROUTES.PROFILE.replace('[username]', username)}>
          <Typography
            fontSize={14}
            component="a"
            target="_blank"
            color="text.primary"
            sx={{
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >{`@${username}`}</Typography>
        </Link>
      </Stack>
    </Stack>
  );
}
