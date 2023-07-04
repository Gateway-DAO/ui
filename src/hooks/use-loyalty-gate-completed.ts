import { useMemo } from 'react';

import { Credentials, Gates } from '@/services/hasura/types';
import { PartialDeep } from 'type-fest/source/partial-deep';

type Props = {
  gate: PartialDeep<Gates>;
  credentialsByLoyalty: PartialDeep<Credentials>[];
};

export function useLoyaltyGateCompleted({ credentialsByLoyalty, gate }: Props) {
  const gateCompletedMemo = useMemo(() => {
    let credential: PartialDeep<Credentials> = null;
    let gateCompleted: PartialDeep<Gates> = null;
    if (credentialsByLoyalty && credentialsByLoyalty.length > 0) {
      credentialsByLoyalty.find((c) => {
        if (c?.gate?.id === gate.id) {
          credential = c;
          gateCompleted = gate;
        }
      });
    }
    return { credential, gateCompleted };
  }, [credentialsByLoyalty, gate]);

  return gateCompletedMemo;
}
