import { useMemo } from 'react';

import { Credentials, Gates } from '@/services/hasura/types';
import { PartialDeep } from 'type-fest/source/partial-deep';

type Props = {
  gate: PartialDeep<Gates>;
  gatesCompleted: PartialDeep<Credentials>[];
};

export function useLoyaltyGateCompleted({ gatesCompleted, gate }: Props) {
  const gateCompletedMemo = useMemo(() => {
    let gateProgressCompleted: PartialDeep<Credentials> = null;
    let gateCompleted: PartialDeep<Gates> = null;
    if (gatesCompleted && gatesCompleted.length > 0) {
      gatesCompleted.find((gateProgress) => {
        if (gateProgress?.gate?.id === gate.id) {
          gateProgressCompleted = gateProgress;
          gateCompleted = gate;
        }
      });
    }
    return { gateProgressCompleted, gateCompleted };
  }, [gatesCompleted, gate]);

  return gateCompletedMemo;
}
