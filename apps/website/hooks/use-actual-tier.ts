import { useMemo } from 'react';

import { PartialDeep } from 'type-fest/source/partial-deep';

import { Loyalty_Tier } from '../services/hasura/types';

type Props = {
  tiers: PartialDeep<Loyalty_Tier>[];
  totalPoints: number;
};

export function useActualTier({ tiers, totalPoints }: Props) {
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
