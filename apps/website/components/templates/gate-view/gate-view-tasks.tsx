import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';

import { useAuth } from '../../../providers/auth';
import { gqlAnonMethods } from '../../../services/hasura/api';
import { CredentialQuery, Gates } from '../../../services/hasura/types';
import GateCompletedModal from '../../organisms/gates/view/modals/gate-completed';
import { DirectHoldersList } from './direct-holders-list/direct-holders-list';
import { DirectHoldersHeader } from './direct-holders-list/header';
import { DraftDirectHoldersList } from './draft-direct-holders-list/draft-direct-holders-list';
import { TaskList } from './task-list';

type GateViewTasksProps = {
  gateProps: PartialDeep<Gates>;
  completedGate: boolean;
  credential: CredentialQuery;
  completedTasksCount: number;
};

export function GateViewTasks({
  gateProps,
  completedGate,
  credential,
  completedTasksCount,
}: GateViewTasksProps) {
  const { me, gqlAuthMethods } = useAuth();
  const [open, setOpen] = useState(false);

  const isAdmin =
    me?.permissions?.filter(
      (permission) =>
        permission.dao_id === gateProps?.dao?.id && permission.dao?.is_admin
    ).length > 0;

  const gateProgress = useQuery(['gate_progress', gateProps?.id, me?.id], () =>
    gqlAuthMethods.GateProgress({
      gateID: gateProps?.id,
      userID: me?.id,
    })
  );

  const completedAt = gateProgress.data?.credentials?.[0]?.created_at;

  const formattedDate = new Date(completedAt?.toLocaleString()).toLocaleString(
    'en-us',
    { hour12: true }
  );

  const directCredentialInfo = useQuery(
    ['direct-credential-info', me?.wallet, gateProps.id],
    () =>
      gqlAnonMethods.direct_credential_info({
        gate_id: gateProps.id,
        wallet: me?.wallet ?? '',
      }),
    {
      enabled:
        gateProps &&
        gateProps.type === 'direct' &&
        gateProps.published !== 'not_published',
    }
  );

  const isDateExpired = (() => {
    if (!gateProps?.expire_date) {
      return false;
    }
    const expireDate = new Date(gateProps?.expire_date);
    return expireDate.getTime() < new Date().getTime();
  })();

  const isLimitExceeded = gateProps?.claim_limit
    ? gateProps?.claim_limit <= gateProps?.holder_count
    : false;

  const handleClose = () => setOpen(false);

  return (
    <>
      <GateCompletedModal
        open={open}
        handleClose={handleClose}
        gate={gateProps}
        credential={credential?.credentials_by_pk}
      />
      {gateProps.published !== 'not_published' &&
        gateProps.type === 'direct' && (
          <DirectHoldersList
            gate={gateProps}
            isLoading={directCredentialInfo.isLoading}
            totalHolders={
              directCredentialInfo.data?.whitelisted_wallets_aggregate
                ?.aggregate.count
            }
            header={
              <DirectHoldersHeader
                hasCredential={completedGate}
                totalHolders={
                  directCredentialInfo.data?.whitelisted_wallets_aggregate
                    ?.aggregate.count
                }
                completedAt={credential?.credentials_by_pk?.created_at}
              />
            }
          />
        )}
      {gateProps.published === 'not_published' &&
        gateProps.type === 'direct' && (
          <DraftDirectHoldersList gate={gateProps} />
        )}
      {gateProps.type === 'task_based' && (
        <TaskList
          gate={gateProps}
          completedAt={completedAt}
          completedTasksCount={completedTasksCount}
          formattedDate={formattedDate}
          isAdmin={isAdmin}
          setOpen={() => {
            gateProgress.remove();
            setOpen(true);
          }}
          isCredentialExpired={isDateExpired || isLimitExceeded}
        />
      )}
    </>
  );
}
