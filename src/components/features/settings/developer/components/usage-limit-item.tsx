import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useMemo } from 'react';

import { brandColors } from '@/theme';

import { Button, Chip, Stack, Typography, alpha } from '@mui/material';

type Props = {
  title: string;
  initialValue: number;
  limitValue: number;
};

export function UsageLimitItem({
  title,
  initialValue = 0,
  limitValue = 0,
}: Props) {
  const { t } = useTranslation('settings');
  const reachedTheLimit = useMemo(
    () => initialValue > 0 && initialValue >= limitValue,
    [initialValue, limitValue]
  );

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        gap={2}
        sx={{ py: 1 }}
      >
        <Stack flexGrow={1}>
          <Typography variant="body1">{title}</Typography>
          <Typography
            variant="caption"
            sx={{
              color: reachedTheLimit
                ? brandColors.red.main
                : alpha(brandColors.white.main, 0.7),
            }}
          >
            {initialValue} {t('developer-portal.usage-limit.out-of')}{' '}
            {limitValue}
          </Typography>
        </Stack>
        {reachedTheLimit && (
          <Chip
            label={t('developer-portal.usage-limit.reached-the-limit')}
            variant="outlined"
            size="small"
            sx={{
              height: 24,
              color: brandColors.red.main,
              borderColor: brandColors.red.main,
            }}
          />
        )}
        <Link href="https://discord.gg/tgt3KjcHGs" target="_blank" passHref>
          <Button
            component="a"
            variant="outlined"
            size="small"
            sx={{ height: 24 }}
          >
            {t('developer-portal.usage-limit.request-more')}
          </Button>
        </Link>
      </Stack>
    </>
  );
}
