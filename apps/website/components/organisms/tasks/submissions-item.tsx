import { brandColors } from '@gateway/theme';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Stack, Typography, alpha, Divider } from '@mui/material';

import { AvatarFile } from '../../atoms/avatar-file';

type SubmissionsItemProps = {
  username?: string;
  datetime?: string;
  text?: string;
};

export function SubmissionsItem({
  username,
  datetime,
  text,
}: SubmissionsItemProps) {
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
        <KeyboardArrowRightIcon
          sx={{ color: `${alpha(brandColors.white.main, 0.7)}` }}
        />
      </Stack>
      <Divider sx={{ width: '100%' }} />
    </Stack>
  );
}
