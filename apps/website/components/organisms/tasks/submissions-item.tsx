import useTranslation from 'next-translate/useTranslation';

import { brandColors } from '@gateway/theme';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Stack, Typography, alpha, Divider } from '@mui/material';

import { AvatarFile } from '../../atoms/avatar-file';
import { InterationType } from '../gates/view/tasks/content/manual/components/task-interation';

type SubmissionsItemProps = {
  username: string;
  datetime: string;
  text: string;
  status?: InterationType;
};

export function SubmissionsItem({
  username,
  datetime,
  text,
  status,
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
              {`- ${datetime}`}
            </Typography>
          </Stack>
          <Typography
            fontSize={14}
            sx={{
              color: `${alpha(brandColors.white.main, 0.7)}`,
            }}
          >
            {text}
          </Typography>
        </Stack>
        {status && (
          <Stack direction="row" gap={0.5} alignItems="center">
            {status === InterationType.APPROVED && (
              <CheckCircleIcon
                sx={{ color: brandColors.green.dark, fontSize: 15 }}
              />
            )}
            {status === InterationType.DENIED && (
              <CancelIcon sx={{ color: brandColors.red.main, fontSize: 15 }} />
            )}
            <Typography
              fontSize={11}
              fontWeight={700}
              sx={{
                textTransform: 'uppercase',
                color:
                  status === InterationType.APPROVED
                    ? brandColors.green.dark
                    : brandColors.red.main,
              }}
            >
              {status === InterationType.APPROVED && t('submissions.approved')}
              {status === InterationType.DENIED && t('submissions.denied')}
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
