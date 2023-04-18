import { useQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { useGateStatus } from '../../../../../hooks/use-gate-status';
import { useAuth } from '../../../../../providers/auth';
import { Gates } from '../../../../../services/hasura/types';
import { GateViewTasks } from '../../../gate-view/gate-view-tasks';

type Props = {
  gate: PartialDeep<Gates>;
};

export function LoyaltyProgramCredentialTasks({ gate }: Props) {
  const { me, gqlAuthMethods } = useAuth();
  const gateStatus = useGateStatus(gate);

  const credential_id = me?.credentials?.find(
    (cred) => cred?.gate_id === gate?.id
  )?.id;

  const { data: credential } = useQuery(
    ['credential', credential_id],
    () =>
      gqlAuthMethods.credential({
        id: credential_id,
      }),
    {
      enabled: !!credential_id,
    }
  );

  return (
    <GateViewTasks
      completedGate={gateStatus.isCompleted}
      credential={credential}
      gateProps={gate}
      completedTasksCount={gateStatus.completedTasksCount}
    />
  );
}
