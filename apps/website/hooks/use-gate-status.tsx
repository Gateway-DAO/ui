import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';

import { useAuth } from '../providers/auth';
import { gqlAnonMethods } from '../services/hasura/api';
import { Gates } from '../services/hasura/types';

export function useGateStatus(gate: PartialDeep<Gates>) {
  const [gateStatus, setGateCompleted] = useState({
    isCompleted: false,
    completedTasksCount: 0,
    isLoading: false,
  });
  const { me } = useAuth();
  const router = useRouter();

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

  const countSimiliarIds = (arr1: string[], arr2?: string[]) => {
    return arr1.filter((id) => !!arr2?.includes(id)).length;
  };

  useEffect(() => {
    const completedTaskIds =
      me?.task_progresses
        .filter((task) => task.completed == 'done')
        .map((task) => task.task_id) || [];

    const taskIds = gate?.tasks?.map((task) => task.id);
    const completedTaskCount = countSimiliarIds(completedTaskIds, taskIds);

    if (
      (gate.type === 'direct' &&
        directCredentialInfo.data?.hasCredential?.aggregate?.count > 0) ||
      (gate.type === 'task_based' && completedTaskCount === gate?.tasks?.length)
    ) {
      setGateCompleted({
        isCompleted: true,
        completedTasksCount: completedTaskCount,
        isLoading: gate.type === 'direct' && directCredentialInfo.isLoading,
      });
    } else {
      setGateCompleted({
        isCompleted: false,
        completedTasksCount: completedTaskCount,
        isLoading: gate.type === 'direct' && directCredentialInfo.isLoading,
      });
    }
  }, [
    me?.task_progresses,
    gate,
    router,
    directCredentialInfo.data?.hasCredential?.aggregate?.count,
    directCredentialInfo.isLoading,
  ]);

  return gateStatus;
}
