import useTranslation from 'next-translate/useTranslation';

import { ISOToString } from '@gateway/helpers';
import { brandColors } from '@gateway/theme';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Stack, Typography, alpha, Divider } from '@mui/material';

import { AvatarFile } from '../../../atoms/avatar-file';
import { InterationType } from '../../gates/view/tasks/content/manual/components/task-interation';

export type SubmissionsItemProps = {
  username: string;
  datetime: string;
  type: InterationType;
  approver?: string;
};

export function SubmissionsItem({
  username,
  datetime,
  approver,
  type,
}: SubmissionsItemProps) {
  const { t } = useTranslation('gate-profile');

  return (
    <Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
        sx={{
          cursor: 'pointer',
          px: 7.5,
          py: 1.5,
          transition: '.3s ease all',
          '&:hover': {
            background: `${alpha(brandColors.purple.main, 0.3)}`,
          },
        }}
      >
        <AvatarFile file={null} fallback="/avatar.png"></AvatarFile>
        <Stack sx={{ flexGrow: 1 }}>
          <Stack direction="row" gap={0.5}>
            <Typography>{`@${username}`}</Typography>
            <Typography
              fontSize={14}
              sx={{
                color: `${alpha(brandColors.white.main, 0.7)}`,
              }}
            >
              {`- ${ISOToString(datetime)}`}
            </Typography>
          </Stack>
          <Typography
            fontSize={14}
            sx={{
              color: `${alpha(brandColors.white.main, 0.7)}`,
            }}
          >
            {type === InterationType.LINK && t('submissions.submitted_link')}
            {type === InterationType.COMMENT && t('submissions.sent_comment')}
            {type === InterationType.DENIED &&
              `@${approver} ${t('submissions.denied_submission')}`}
            {type === InterationType.APPROVED &&
              `${approver} ${t('submissions.approved_submission')}`}
          </Typography>
        </Stack>
        {type && (
          <Stack direction="row" gap={0.5} alignItems="center">
            {type === InterationType.APPROVED && (
              <CheckCircleIcon
                sx={{ color: brandColors.green.main, fontSize: 15 }}
              />
            )}
            {type === InterationType.DENIED && (
              <CancelIcon sx={{ color: brandColors.red.main, fontSize: 15 }} />
            )}
            <Typography
              fontSize={11}
              fontWeight={700}
              sx={{
                textTransform: 'uppercase',
                color:
                  type === InterationType.APPROVED
                    ? brandColors.green.main
                    : brandColors.red.main,
              }}
            >
              {type === InterationType.APPROVED && t('submissions.approved')}
              {type === InterationType.DENIED && t('submissions.denied')}
            </Typography>
          </Stack>
        )}
        <KeyboardArrowRightIcon
          sx={{ color: `${alpha(brandColors.white.main, 0.7)}` }}
        />
      </Stack>
      <Divider sx={{ width: '100%' }} />
    </Stack>
  );
}
