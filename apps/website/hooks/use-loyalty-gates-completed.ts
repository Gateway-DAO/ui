import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { query } from '../constants/queries';
import { useAuth } from '../providers/auth';
import { Gate_Progress, Scalars } from '../services/hasura/types';

type Props = {
  loyaltyProgramId: Scalars['uuid'];
};

export function useLoyaltyGatesCompleted({ loyaltyProgramId }: Props) {
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
      select: (data) => data,
      enabled: !!me?.id,
    }
  );

  const totalPoints = useMemo(() => {
    let pts = 0;
    if (gatesCompleted?.data?.gate_progress) {
      gatesCompleted.data.gate_progress.map((gateProgress) => {
        if (
          gateProgress?.gate?.points > 0 &&
          gateProgress?.gate?.published === 'published'
        ) {
          pts += gateProgress.gate.points;
        }
        console.log(gateProgress.gate);
      });
    }
    if (gatesCompleted?.data?.whitelisted_wallets) {
      gatesCompleted?.data?.whitelisted_wallets?.map((whitelisted) => {
        if (whitelisted?.gate?.points > 0) {
          pts += whitelisted.gate.points;
        }
      });
    }
    return pts;
  }, [gatesCompleted]);

  return {
    totalPoints,
    isLoading: me?.id && gatesCompleted.isLoading,
    gatesCompleted: [
      ...(gatesCompleted?.data?.gate_progress || []),
      ...(gatesCompleted?.data?.whitelisted_wallets || []),
    ] as PartialDeep<Gate_Progress>[],
  };
}
