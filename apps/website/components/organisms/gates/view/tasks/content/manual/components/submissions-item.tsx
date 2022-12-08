import useTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';

import { ISOToString } from '@gateway/helpers';
import { brandColors, theme } from '@gateway/theme';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
  Stack,
  Typography,
  alpha,
  useMediaQuery,
  ButtonBase,
} from '@mui/material';

import { useAuth } from '../../../../../../../../providers/auth';
import {
  Task_Progress,
  Manual_Task_Events,
} from '../../../../../../../../services/graphql/types.generated';
import { AvatarFile } from '../../../../../../../atoms/avatar-file';

export type SubmissionsItemProps = {
  progress: PartialDeep<Task_Progress>;
  onSelect: (
    event: PartialDeep<Manual_Task_Events>,
    progress: PartialDeep<Task_Progress>
  ) => void;
};

export function SubmissionsItem({ progress, onSelect }: SubmissionsItemProps) {
  const { t, lang } = useTranslation('gate-profile');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { gqlAuthMethods } = useAuth();
  const progressEvent = useQuery(
    ['progress-event', progress.id],
    () => gqlAuthMethods.manual_tasks_status({ task_progress_id: progress.id }),
    {
      select: (data) => data.manual_task_events?.[0],
    }
  );

  const issuer = progressEvent.data?.issuer;
  const event_type = progressEvent.data?.event_type;

  const datetimeString = useMemo(() => {
    if (!progressEvent.data?.updated_at) return '';
    return ISOToString(progressEvent.data.updated_at, lang) == 'now'
      ? t('submissions.just_now')
      : ISOToString(progressEvent.data.updated_at, lang);
  }, [progressEvent.data?.updated_at, lang]);

  return (
    <Stack
      component={ButtonBase}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      gap={2}
      sx={{
        px: { xs: 2, lg: 7.5 },
        py: { xs: 1, lg: 1.5 },
        '&:hover': {
          background: `${alpha(brandColors.purple.main, 0.3)}`,
        },
        textAlign: 'left',
      }}
      onClick={() => onSelect(progressEvent.data, progress)}
    >
      <AvatarFile
        file={progress.user.picture}
        fallback="/avatar.png"
      ></AvatarFile>
      {!!(issuer && event_type) && (
        <>
          <Stack sx={{ flexGrow: 1 }}>
            <Stack
              gap={0.5}
              sx={{ flexDirection: { xs: 'column', lg: 'row' } }}
            >
              <Typography>{`@${progressEvent.data.issuer.username}`}</Typography>
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
                `@${issuer.name} ${t('submissions.sent_comment')}`}
              {event_type === 'reject' &&
                `@${issuer.name} ${t('submissions.denied_submission')}`}
              {event_type === 'approve' &&
                `@${issuer.name} ${t('submissions.approved_submission')}`}
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
        </>
      )}
      <KeyboardArrowRightIcon
        sx={{ color: `${alpha(brandColors.white.main, 0.7)}` }}
      />
    </Stack>
  );
}
