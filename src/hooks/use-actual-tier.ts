import { useMemo } from 'react';

import { Loyalty_Tier } from '@/services/hasura/types';
import { PartialDeep } from 'type-fest/source/partial-deep';

type Props = {
  tiers: PartialDeep<Loyalty_Tier>[];
  totalPoints: number;
};

export function useActualTier({ tiers, totalPoints = 0 }: Props) {
  const actualTier = useMemo(() => {
    const tiersSorted = tiers?.sort((a, b) => a.min_pts - b.min_pts);
    return tiersSorted?.find((tier) => {
      if (totalPoints >= tier.min_pts && totalPoints <= tier.max_pts) {
        return tier;
      }
    });
  }, [tiers, totalPoints]);

  return actualTier;
}
