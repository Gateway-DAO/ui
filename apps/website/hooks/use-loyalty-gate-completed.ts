import { useMemo } from 'react';

import { PartialDeep } from 'type-fest/source/partial-deep';

import { Gate_Progress, Gates } from '../services/hasura/types';

type Props = {
  gate: PartialDeep<Gates>;
  gatesCompleted: PartialDeep<Gate_Progress>[];
};

export function useLoyaltyGateCompleted({ gatesCompleted, gate }: Props) {
  const gateCompletedMemo = useMemo(() => {
    let gateProgressCompleted: PartialDeep<Gate_Progress> = null;
    let gateCompleted: PartialDeep<Gates> = null;
    if (gatesCompleted && gatesCompleted.length > 0) {
      gatesCompleted.find((gateProgress) => {
        if (gateProgress.gate_id === gate.id) {
          gateProgressCompleted = gateProgress;
          gateCompleted = gate;
        }
      });
    }
    return { gateProgressCompleted, gateCompleted };
  }, [gatesCompleted, gate]);

  return gateCompletedMemo;
}
