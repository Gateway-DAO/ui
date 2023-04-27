import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { query } from '../constants/queries';
import { useAuth } from '../providers/auth';
import { Credentials, Scalars } from '../services/hasura/types';

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
    if (gatesCompleted?.data?.credentials) {
      gatesCompleted.data.credentials.map((credential) => {
        if (
          credential?.gate?.points > 0 &&
          credential?.gate?.published === 'published'
        ) {
          pts += credential.gate.points;
        }
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
      ...(gatesCompleted?.data?.credentials || []),
      ...(gatesCompleted?.data?.whitelisted_wallets || []),
    ] as PartialDeep<Credentials>[],
  };
}
