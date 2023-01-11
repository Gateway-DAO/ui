import { ReactNode } from 'react';

import { brandColors } from '@gateway/theme';

import VerifiedIcon from '@mui/icons-material/Verified';
import { Stack, Typography, alpha, Tooltip } from '@mui/material';

import CopyPaste from './copy-paste';

type Props = {
  title: string;
  labelId: string;
  id: string;
  copySucessMessage: string;
  badgeTooltip?: string;
};

export default function InfoTitle({
  title,
  labelId,
  id,
  copySucessMessage,
  badgeTooltip,
}: Props) {
  return (
    <Stack sx={{ verticalAlign: 'center', justifyContent: 'center' }}>
      <Stack direction="row" alignItems="center" gap={0.5}>
        <Typography
          fontSize={12}
          sx={{ color: alpha(brandColors.white.main, 0.7) }}
        >
          {labelId}
        </Typography>
        <CopyPaste text={id} sucessMessage={copySucessMessage} />
      </Stack>
      <Stack direction="row" alignItems="center" gap={1}>
        <Typography variant="h4" sx={{ fontSize: { xs: '20px', md: '34px' } }}>
          {title}
        </Typography>
        {badgeTooltip && (
          <Tooltip title={badgeTooltip}>
            <VerifiedIcon sx={{ color: brandColors.purple.main }} />
          </Tooltip>
        )}
      </Stack>
    </Stack>
  );
}
