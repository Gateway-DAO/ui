import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

import { PartialDeep } from 'type-fest/source/partial-deep';

import { brandColors } from '@gateway/theme';

import { Box, Chip, Stack, Typography, alpha } from '@mui/material';

import { ROUTES } from '../../../../constants/routes';
import { useActualTier } from '../../../../hooks/use-actual-tier';
import { useLoyaltyGateCompleted } from '../../../../hooks/use-loyalty-gate-completed';
import { useLoyaltyGatesCompleted } from '../../../../hooks/use-loyalty-gates-completed';
import { Gates, Loyalty_Program } from '../../../../services/hasura/types';
import TierInfo from './TierInfo';
import { TierRuler } from './TierRuler';

type Props = {
  loyalty: PartialDeep<Loyalty_Program>;
  gate?: PartialDeep<Gates>;
};

export function SmallTier({ loyalty, gate }: Props) {
  const { t } = useTranslation('loyalty-program');
  const { totalPoints, isLoading, gatesCompleted } = useLoyaltyGatesCompleted({
    loyaltyProgramId: loyalty.id,
  });

  const actualTier = useActualTier({
    tiers: loyalty.loyalty_tiers,
    totalPoints,
  });

  const { gateCompleted } = useLoyaltyGateCompleted({
    gate,
    gatesCompleted: gatesCompleted?.data,
  });

  return (
    <>
      <Typography
        fontSize={14}
        sx={{
          color: alpha(brandColors.white.main, 0.7),
          mb: { xs: 2, md: 3 },
        }}
      >
        {t('tier.linked-to-the-loyalty-pass')}
      </Typography>
      <Link href={ROUTES.LOYALTY_PROGRAM.replace('[id]', loyalty.id)} passHref>
        <Stack
          sx={{
            mb: 3,
            p: 3,
            border: '1px solid rgba(229, 229, 229, 0.12)',
            cursor: 'pointer',
            borderRadius: 2,
            background:
              'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%), #10041C',
          }}
        >
          <Stack direction="row" gap={3} sx={{ mb: 3 }}>
            <Box
              sx={{
                width: 72,
                height: 72,
                flexGrow: 0,
                minWidth: 72,
              }}
            >
              <Box
                component="img"
                src={loyalty.image}
                alt={loyalty.name}
                width="100%"
              />
            </Box>
            <Stack>
              <Typography variant="h6" lineHeight={0.9} sx={{ mb: 1.5 }}>
                {loyalty.name}
              </Typography>
              <Typography
                fontSize={12}
                sx={{ color: alpha(brandColors.white.main, 0.7) }}
              >
                {loyalty.description}
              </Typography>
            </Stack>
          </Stack>
          <TierInfo
            tier={actualTier?.tier}
            isLoading={isLoading}
            totalPoints={totalPoints}
          />
          <TierRuler
            tiers={loyalty.loyalty_tiers}
            totalPoints={totalPoints}
            size="small"
          />
        </Stack>
      </Link>
      <Stack direction="row" alignItems="center" sx={{ mb: 4 }}>
        <Typography flexGrow={1}>{t('tier.reward')}</Typography>
        {gateCompleted ? (
          <Chip
            label={`${t('tier.you-earned')} +${gateCompleted?.points}pts`}
            sx={{
              backgroundColor: brandColors.green.main,
              color: '#10041C',
              fontWeight: 500,
            }}
          />
        ) : (
          <Chip label={`+${gate?.points}pts`} sx={{ fontWeight: 500 }} />
        )}
      </Stack>
    </>
  );
}
