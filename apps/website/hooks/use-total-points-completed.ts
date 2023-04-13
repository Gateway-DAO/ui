import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { query } from '../constants/queries';
import { useAuth } from '../providers/auth';
import { Scalars } from '../services/hasura/types';

type Props = {
  loyaltyProgramId: Scalars['uuid'];
};

export function useTotalPointsCompleted({ loyaltyProgramId }: Props) {
  const { me, gqlAuthMethods } = useAuth();

  const gatesCompleted = useQuery(
    [
      query.gate_progress_completed_by_loyalty_program,
      { userId: me?.id, loyaltyProgramId },
    ],
    () =>
      gqlAuthMethods.get_gate_progress_completed_by_loyalty_program({
        userId: me?.id,
        loyaltyProgramId: loyaltyProgramId,
      }),
    {
      select: (data) => data.gate_progress,
      enabled: !!me?.id,
    }
  );

  const totalPoints = useMemo(() => {
    let pts = 0;
    if (gatesCompleted.data) {
      gatesCompleted.data.map((gateProgress) => {
        if (gateProgress?.gate?.points > 0) {
          pts += gateProgress.gate.points;
        }
      });
    }
    return pts;
  }, [gatesCompleted]);

  return { totalPoints, isLoading: gatesCompleted.isLoading };
}
