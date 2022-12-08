import useTranslation from 'next-translate/useTranslation';

import { ISOToString } from '@gateway/helpers';
import { brandColors, theme } from '@gateway/theme';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
  Stack,
  Typography,
  alpha,
  Divider,
  useMediaQuery,
} from '@mui/material';

import { Scalars } from '../../../../../../../../services/graphql/types.generated';
import { AvatarFile } from '../../../../../../../atoms/avatar-file';

export type SubmissionsItemProps = {
  username: string;
  datetime: string;
  event_type: Scalars['manual_task_event_type'];
  approver?: string;
};

export function SubmissionsItem({
  username,
  datetime,
  approver,
  event_type,
}: SubmissionsItemProps) {
  const { t, lang } = useTranslation('gate-profile');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const datetimeString =
    ISOToString(datetime, lang) == 'now'
      ? t('submissions.just_now')
      : ISOToString(datetime, lang);

  return (
    <Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
        sx={{
          cursor: 'pointer',
          px: { xs: 2, lg: 7.5 },
          py: { xs: 1, lg: 1.5 },
          transition: '.3s ease all',
          '&:hover': {
            background: `${alpha(brandColors.purple.main, 0.3)}`,
          },
        }}
      >
        <AvatarFile file={null} fallback="/avatar.png"></AvatarFile>
        <Stack sx={{ flexGrow: 1 }}>
          <Stack gap={0.5} sx={{ flexDirection: { xs: 'column', lg: 'row' } }}>
            <Typography>{`@${username}`}</Typography>
            <Typography
              fontSize={14}
              sx={{
                color: `${alpha(brandColors.white.main, 0.7)}`,
              }}
            >
              {`${isMobile ? '' : '- '}${datetimeString}`}
            </Typography>
          </Stack>
          <Typography
            fontSize={14}
            sx={{
              color: `${alpha(brandColors.white.main, 0.7)}`,
            }}
          >
            {event_type === 'send_link' && t('submissions.submitted_link')}
            {event_type === 'comment' &&
              `@${approver} ${t('submissions.sent_comment')}`}
            {event_type === 'reject' &&
              `@${approver} ${t('submissions.denied_submission')}`}
            {event_type === 'approve' &&
              `@${approver} ${t('submissions.approved_submission')}`}
          </Typography>
        </Stack>
        <Stack direction="row" gap={0.5} alignItems="center">
          {event_type === 'approve' && (
            <CheckCircleIcon
              sx={{ color: brandColors.green.main, fontSize: 15 }}
            />
          )}
          {event_type === 'reject' && (
            <CancelIcon sx={{ color: brandColors.red.main, fontSize: 15 }} />
          )}
          <Typography
            fontSize={11}
            fontWeight={700}
            sx={{
              textTransform: 'uppercase',
              color:
                event_type === 'approve'
                  ? brandColors.green.main
                  : brandColors.red.main,
            }}
          >
            {event_type === 'approve' && t('submissions.approved')}
            {event_type === 'reject' && t('submissions.denied')}
          </Typography>
        </Stack>
        <KeyboardArrowRightIcon
          sx={{ color: `${alpha(brandColors.white.main, 0.7)}` }}
        />
      </Stack>
      <Divider sx={{ width: '100%' }} />
    </Stack>
  );
}
