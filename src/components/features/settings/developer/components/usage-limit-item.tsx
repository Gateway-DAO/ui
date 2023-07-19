import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useMemo } from 'react';

import { gateway_discord } from '@/constants/socials';
import { brandColors } from '@/theme';

import { Button, Chip, Stack, Typography, alpha } from '@mui/material';

type Props = {
  title: string;
  usage: number;
  limit: number;
};

export function UsageLimitItem({ title, usage = 0, limit = 0 }: Props) {
  const { t } = useTranslation('settings');
  const reachedTheLimit = useMemo(
    () => usage > 0 && usage >= limit,
    [usage, limit]
  );

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
        sx={{ py: 2 }}
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
            {usage} {t('developer-portal.usage-limit.out-of')} {limit}
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
        <Link href={gateway_discord} target="_blank" passHref>
          <Button
            component="a"
            variant="outlined"
            size="small"
            sx={{ height: 24 }}
            target="_blank"
          >
            {t('developer-portal.usage-limit.request-more')}
          </Button>
        </Link>
      </Stack>
    </>
  );
}
