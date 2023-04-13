import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

import { PartialDeep } from 'type-fest/source/partial-deep';

import { brandColors } from '@gateway/theme';

import { Box, Chip, Stack, Typography, alpha } from '@mui/material';

import Loading from '../../../../components/atoms/loading';
import { ROUTES } from '../../../../constants/routes';
import { useActualTier } from '../../../../hooks/use-actual-tier';
import { useTotalPointsCompleted } from '../../../../hooks/use-total-points-completed';
import { Loyalty_Program } from '../../../../services/hasura/types';
import { TierRuler } from './TierRuler';

type Props = {
  loyalty: PartialDeep<Loyalty_Program>;
};

export function SmallTier({ loyalty }: Props) {
  const { t } = useTranslation('loyalty-program');
  const { totalPoints, isLoading } = useTotalPointsCompleted({
    loyaltyProgramId: loyalty.id,
  });

  const actualTier = useActualTier({
    tiers: loyalty.loyalty_tiers,
    totalPoints,
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
        {t('loyalty-program-page.tier.linked-to-the-loyalty-pass')}
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
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 1 }}
          >
            <Typography fontSize={12} sx={{ color: brandColors.green.main }}>
              {!isLoading ? actualTier?.tier : 'Loading..'}
            </Typography>
            <Typography fontSize={12}>
              {!isLoading ? (
                `${totalPoints} pts`
              ) : (
                <Loading size={12} marginTop={0} />
              )}
            </Typography>
          </Stack>
          <TierRuler
            tiers={loyalty.loyalty_tiers}
            totalPoints={totalPoints}
            size="small"
          />
        </Stack>
      </Link>
      <Stack direction="row" alignItems="center" sx={{ mb: 4 }}>
        <Typography flexGrow={1}>Reward</Typography>
        <Chip
          label={`${t(
            'loyalty-program-page.tier.you-earned'
          )} +${totalPoints}pts`}
          sx={{
            backgroundColor: brandColors.green.main,
            color: '#10041C',
            fontWeight: 500,
            width: 'auto',
          }}
        />
      </Stack>
    </>
  );
}
