import useTranslation from 'next-translate/useTranslation';

import Loading from '@/components/atoms/loading';
import { useActualTier } from '@/hooks/use-actual-tier';
import { useLoyaltyGatesCompleted } from '@/hooks/use-loyalty-gates-completed';
import { useAuth } from '@/providers/auth';
import { Loyalty_Program } from '@/services/hasura/types';
import { TOKENS, brandColors } from '@/theme';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { Chip, Stack, Typography, alpha } from '@mui/material';

import { TierRuler } from './tier-ruler';

type Props = {
  loyalty: PartialDeep<Loyalty_Program>;
};

export function Tier({ loyalty }: Props) {
  const { t } = useTranslation('loyalty-program');
  const { me } = useAuth();
  const { totalPoints, isLoading } = useLoyaltyGatesCompleted({
    loyaltyProgramId: loyalty.id,
  });
  const actualTier = useActualTier({
    tiers: loyalty.loyalty_tiers,
    totalPoints,
  });

  return (
    <Stack
      sx={{
        mx: TOKENS.CONTAINER_PX,
        mt: 2,
        mb: 3,
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
        {t('tier.your-tier')}
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ mb: { xs: 3, md: 4 } }}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <Stack direction="row" alignItems="baseline">
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
        )}
        {me?.id && actualTier?.tier && (
          <Chip
            label={actualTier?.tier}
            sx={{
              backgroundColor: brandColors.green.main,
              color: '#10041C',
              fontWeight: 500,
              fontSize: 16,
              borderRadius: 3,
              p: '24px 6px',
            }}
          />
        )}
      </Stack>
      <TierRuler tiers={loyalty.loyalty_tiers} totalPoints={totalPoints} />
    </Stack>
  );
}
