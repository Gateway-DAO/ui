import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

import { ROUTES } from '@/constants/routes';
import { useActualTier } from '@/hooks/use-actual-tier';
import { Loyalty_Program } from '@/services/hasura/types';
import { brandColors } from '@/theme';
import { limitChars } from '@/utils/string';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { Box, Chip, Stack, Typography, alpha } from '@mui/material';

import TierInfo from './tier-info';
import { TierRuler } from './tier-ruler';

type Props = {
  loyalty: PartialDeep<Loyalty_Program>;
  loyaltyPoints: number;
  currentGatePoints: number;
  gateIsFinished: boolean;
};

export function SmallTier({
  loyalty,
  loyaltyPoints = 0,
  currentGatePoints,
  gateIsFinished,
}: Props) {
  const { t } = useTranslation('loyalty-program');

  const actualTier = useActualTier({
    tiers: loyalty.loyalty_tiers,
    totalPoints: loyaltyPoints,
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
          <Stack direction="row" gap={3} sx={{ mb: 3 }} alignItems="center">
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
                sx={{
                  borderRadius: '50% 50% 0 0',
                }}
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
                {limitChars(loyalty.description, 35)}
              </Typography>
            </Stack>
          </Stack>
          <TierInfo tier={actualTier?.tier} totalPoints={loyaltyPoints} />
          <TierRuler
            tiers={loyalty.loyalty_tiers}
            totalPoints={loyaltyPoints}
            size="small"
          />
        </Stack>
      </Link>
      <Stack direction="row" alignItems="center" sx={{ mb: 4 }}>
        <Typography flexGrow={1}>{t('tier.reward')}</Typography>
        {gateIsFinished ? (
          <Chip
            label={`${t('tier.you-earned')} +${currentGatePoints}pts`}
            sx={{
              backgroundColor: brandColors.green.main,
              color: '#10041C',
              fontWeight: 500,
            }}
          />
        ) : (
          <Chip label={`+${currentGatePoints} pts`} sx={{ fontWeight: 500 }} />
        )}
      </Stack>
    </>
  );
}
