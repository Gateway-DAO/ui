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

  const totalPoints = useMemo(() => {
    let pts = 0;
    if (gatesCompleted?.data) {
      gatesCompleted.data.map((credential) => {
        if (
          credential?.gate?.points > 0 &&
          credential?.gate?.published === 'published'
        ) {
          pts += credential.gate.points;
        }
      });
    }
    return pts;
  }, [gatesCompleted]);

  return {
    totalPoints,
    isLoading: me?.id && gatesCompleted.isLoading,
    gatesCompleted: gatesCompleted?.data,
  };
}
