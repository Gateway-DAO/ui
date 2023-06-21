import { useMemo } from 'react';

import { query } from '@/constants/queries';
import { useAuth } from '@/providers/auth';
import { Scalars } from '@/services/hasura/types';
import { useQuery } from '@tanstack/react-query';

type Props = {
  loyaltyProgramId: Scalars['uuid'];
};

export function useLoyaltyGatesCompleted({ loyaltyProgramId }: Props) {
  const { me, hasuraUserService } = useAuth();

  const gatesCompleted = useQuery(
    [
      query.gate_progress_completed_by_loyalty_program,
      { userId: me?.id, loyaltyProgramId },
    ],
    () =>
      hasuraUserService.get_gate_progress_completed_by_loyalty_program({
        userId: me?.id,
        loyaltyProgramId: loyaltyProgramId,
      }),
    {
      select: (data) => data.credentials,
      enabled: !!me?.id,
    }
  );

  const loyaltyProgress = useQuery(
    [
      query.get_loyalty_progress,
      { user_id: me?.id, loyalty_id: loyaltyProgramId },
    ],
    () =>
      hasuraUserService.get_loyalty_progress({
        user_id: me?.id,
        loyalty_id: loyaltyProgramId,
      }),
    {
      select: (data) => data.loyalty_progress.find((lp) => lp),
      enabled: !!me?.id,
    }
  );

  return {
    totalPoints: loyaltyProgress?.data?.points,
    isLoading:
      me?.id && (gatesCompleted.isLoading || loyaltyProgress.isLoading),
    gatesCompleted: gatesCompleted?.data,
  };
}
