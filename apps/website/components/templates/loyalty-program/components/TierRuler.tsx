import { PartialDeep } from 'type-fest/source/partial-deep';

import { brandColors } from '@gateway/theme';

import { Box, Stack, Typography, alpha } from '@mui/material';

import {
  Loyalty_Program,
  Loyalty_Tier,
} from '../../../../services/hasura/types';
import { useLoyaltyProgramContext } from '../LoyaltyProgramContext';

type Props = {
  loyalty: PartialDeep<Loyalty_Program>;
  size?: 'small' | 'big';
};

export function TierRuler({ loyalty, size = 'big' }: Props) {
  const { totalPoints } = useLoyaltyProgramContext();
  const tiers = loyalty?.loyalty_tiers?.sort((a, b) => a.min_pts - b.min_pts);

  const CalcWidthBoxProgress = (tier: PartialDeep<Loyalty_Tier>) => {
    if (totalPoints >= tier.max_pts) {
      return '100%';
    }
    if (totalPoints > tier.min_pts && totalPoints < tier.max_pts) {
      const tierWidth = tier.max_pts - tier.min_pts;
      const progressIntoTier = totalPoints - tier.min_pts;
      return progressIntoTier / tierWidth;
    }
    return 0;
  };

  return (
    <>
      {tiers && (
        <Stack direction="row">
          {tiers
            .sort((a, b) => a.min_pts - b.min_pts)
            .map((tier, index) => (
              <Stack key={tier.id} flexGrow={1} sx={{ ml: 0.25 }}>
                {size === 'big' && (
                  <Typography fontSize={12} sx={{ mb: 1.5 }}>
                    {tier.tier}
                  </Typography>
                )}
                <Box
                  sx={{
                    width: '100%',
                    height: size === 'big' ? '12px' : '4px',
                    mb: 1.5,
                    position: 'relative',
                    background: alpha(brandColors.green.main, 0.3),
                    borderRadius:
                      index === 0
                        ? '12px 0 0 12px'
                        : index === tiers.length - 1
                        ? '0 12px 12px 0'
                        : '0',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      width: CalcWidthBoxProgress(tier),
                      height: '100%',
                      background: brandColors.green.main,
                      position: 'absolute',
                    }}
                  />
                </Box>
                {size === 'big' && (
                  <Typography
                    fontSize={12}
                    sx={{ color: alpha(brandColors.white.main, 0.7) }}
                  >
                    {tier.min_pts}
                  </Typography>
                )}
              </Stack>
            ))}
        </Stack>
      )}
    </>
  );
}
