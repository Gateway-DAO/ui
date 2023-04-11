import { useQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { useGateCompleted } from '../../../../../hooks/use-gate-completed';
import { useAuth } from '../../../../../providers/auth';
import { Gates } from '../../../../../services/hasura/types';
import { GateViewTasks } from '../../../gate-view/gate-view-tasks';

type Props = {
  gate: PartialDeep<Gates>;
};

export function LoyaltyProgramCredentialTasks({ gate }: Props) {
  const { me, gqlAuthMethods } = useAuth();
  const gateCompleted = useGateCompleted(gate);

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

  const isAdmin =
    me?.permissions?.filter(
      (permission) =>
        permission.dao_id === gate?.dao?.id && permission.dao?.is_admin
    ).length > 0;

  return (
    <GateViewTasks
      completedGate={gateCompleted.isCompleted}
      credential={credential}
      gateProps={gate}
      isAdmin={isAdmin}
      published={gate.published}
      completedTasksCount={gateCompleted.completedTasksCount}
    />
  );
}
