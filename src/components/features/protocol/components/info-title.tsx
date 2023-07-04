import { useState } from 'react';

import CopyPaste from '@/components/molecules/copy-paste';
import { brandColors } from '@/theme';

import VerifiedIcon from '@mui/icons-material/Verified';
import {
  Stack,
  Typography,
  alpha,
  Tooltip,
  ClickAwayListener,
  Skeleton,
} from '@mui/material';

type Props = {
  title: string;
  labelId: string;
  id: string;
  copySucessMessage: string;
  badgeTooltip?: string;
  isLoading?: boolean;
};

export default function InfoTitle({
  title,
  labelId,
  id,
  copySucessMessage,
  badgeTooltip,
  isLoading,
}: Props) {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <Stack sx={{ verticalAlign: 'center', justifyContent: 'center', mb: 1 }}>
      <Stack direction="row" alignItems="center">
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
          {isLoading ? <Skeleton width={300} /> : title}
        </Typography>
        {badgeTooltip && (
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip
              title={badgeTooltip}
              arrow
              onClose={handleTooltipClose}
              open={open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
            >
              <VerifiedIcon
                onClick={handleTooltipOpen}
                sx={{ color: brandColors.purple.main, cursor: 'pointer' }}
              />
            </Tooltip>
          </ClickAwayListener>
        )}
      </Stack>
    </Stack>
  );
}
