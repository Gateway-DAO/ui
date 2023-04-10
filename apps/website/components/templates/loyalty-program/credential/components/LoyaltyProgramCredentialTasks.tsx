import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { useAuth } from '../../../../../providers/auth';
import { gqlAnonMethods } from '../../../../../services/hasura/api';
import { Gates, Loyalty_Program } from '../../../../../services/hasura/types';
import { GateViewTasks } from '../../../gate-view/gate-view-tasks';

type Props = {
  loyalty: PartialDeep<Loyalty_Program>;
  gate: PartialDeep<Gates>;
};

export function LoyaltyProgramCredentialTasks({ gate, loyalty }: Props) {
  const { me, gqlAuthMethods } = useAuth();
  const router = useRouter();
  const [completedTasksCount, setCompletedTasksCount] = useState(0);

  const countSimiliarIds = (arr1: string[], arr2?: string[]) => {
    return arr1.filter((id) => !!arr2?.includes(id)).length;
  };

  const taskIds = gate?.tasks?.map((task) => task.id);

  useEffect(() => {
    const completedTaskIds =
      me?.task_progresses
        .filter((task) => task.completed == 'done')
        .map((task) => task.task_id) || [];

    setCompletedTasksCount(countSimiliarIds(completedTaskIds, taskIds));
  }, [taskIds, me?.task_progresses, gate, router]);

  const directCredentialInfo = useQuery(
    ['direct-credential-info', me?.wallet, gate.id],
    () =>
      gqlAnonMethods.direct_credential_info({
        gate_id: gate.id,
        wallet: me?.wallet ?? '',
      }),
    {
      enabled: gate && gate.type === 'direct' && gate.published === 'published',
    }
  );

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

  const completedGate =
    gate.type === 'direct'
      ? directCredentialInfo.data?.hasCredential?.aggregate?.count > 0
      : completedTasksCount === gate?.tasks?.length;

  const isAdmin =
    me?.permissions?.filter(
      (permission) =>
        permission.dao_id === gate?.dao?.id && permission.dao?.is_admin
    ).length > 0;

  return (
    <GateViewTasks
      completedGate={completedGate}
      credential={credential}
      gateProps={gate}
      isAdmin={isAdmin}
      published={gate.published}
      completedTasksCount={completedTasksCount}
    />
  );
}
