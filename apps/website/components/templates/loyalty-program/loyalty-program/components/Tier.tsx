import useTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';

import { PartialDeep } from 'type-fest/source/partial-deep';

import { TOKENS, brandColors } from '@gateway/theme';

import { Chip, Stack, Typography, alpha } from '@mui/material';

import { Loyalty_Program } from '../../../../../services/hasura/types';
import { useLoyaltyProgramContext } from '../../LoyaltyProgramContext';
import { TierRuler } from './TierRuler';

type Props = {
  loyalty: PartialDeep<Loyalty_Program>;
};

export function Tier({ loyalty }: Props) {
  const { t } = useTranslation('loyalty-program');
  const { totalPoints } = useLoyaltyProgramContext();

  const actualTier = useMemo(() => {
    const tiers = loyalty?.loyalty_tiers?.sort((a, b) => a.min_pts - b.min_pts);
    return tiers?.find((tier) => {
      if (totalPoints > tier.min_pts && totalPoints <= tier.max_pts) {
        return tier;
      }
    });
  }, [loyalty.loyalty_tiers, totalPoints]);

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
      <TierRuler loyalty={loyalty} />
    </Stack>
  );
}
