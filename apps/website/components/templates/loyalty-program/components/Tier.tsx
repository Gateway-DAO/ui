import useTranslation from 'next-translate/useTranslation';
import { useEffect, useMemo } from 'react';

import { PartialDeep } from 'type-fest/source/partial-deep';
import { useQuery } from 'wagmi';

import { TOKENS, brandColors } from '@gateway/theme';

import { Chip, Stack, Typography, alpha } from '@mui/material';

import { useActualTier } from '../../../../hooks/use-actual-tier';
import { useTotalPointsCompleted } from '../../../../hooks/use-total-points-completed';
import { Loyalty_Program } from '../../../../services/hasura/types';
import { TierRuler } from './TierRuler';

type Props = {
  loyalty: PartialDeep<Loyalty_Program>;
};

export function Tier({ loyalty }: Props) {
  const { t } = useTranslation('loyalty-program');
  const totalPoints = useTotalPointsCompleted({ loyaltyProgramId: loyalty.id });
  const actualTier = useActualTier({
    tiers: loyalty.loyalty_tiers,
    totalPoints,
  });

  return (
    <Stack
      sx={{
        mx: TOKENS.CONTAINER_PX,
        mt: 2,
        mb: { xs: 2, md: 7.5 },
      }}
    >
      <Typography
        fontSize={12}
        sx={{
          color: alpha(brandColors.white.main, 0.7),
          textTransform: 'uppercase',
          mb: { xs: 2, md: 3 },
        }}
      >
        {t('loyalty-program-page.tier.your-tier')}
      </Typography>
      <Stack direction="row" sx={{ mb: { xs: 3, md: 4 } }}>
        <Stack direction="row" alignItems="baseline" flexGrow={1}>
          <Typography
            fontWeight={700}
            lineHeight={0.9}
            sx={{ fontSize: { xs: 60, md: 96 } }}
          >
            {totalPoints}
          </Typography>
          <Typography sx={{ color: alpha(brandColors.white.main, 0.7) }}>
            pts
          </Typography>
        </Stack>
        <Chip
          label={actualTier?.tier || 'Tier'}
          sx={{
            backgroundColor: brandColors.green.main,
            color: '#10041C',
            fontWeight: 500,
            fontSize: 16,
            borderRadius: 3,
            p: '24px 6px',
          }}
        />
      </Stack>
      <TierRuler tiers={loyalty.loyalty_tiers} totalPoints={totalPoints} />
    </Stack>
  );
}
