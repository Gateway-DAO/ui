import { useState } from 'react';

import GateCompletedModal from '@/components/features/gates/view/gate-completed';
import { useCredentialByGateId } from '@/hooks/use-credential-by-gate-id';
import { useGateStatus } from '@/hooks/use-gate-status';
import { useAuth } from '@/providers/auth';
import { hasuraPublicService } from '@/services/hasura/api';
import { Gates } from '@/services/hasura/types';
import { isDaoAdmin } from '@/utils/is-dao-admin';
import { useQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';

import { DirectHoldersList } from './tasks/direct-holders-list/direct-holders-list';
import { DirectHoldersHeader } from './tasks/direct-holders-list/header';
import { DraftDirectHoldersList } from './tasks/draft-direct-holders-list/draft-direct-holders-list';
import { TaskList } from './tasks/task-list';

type GateViewContentProps = {
  gateProps: PartialDeep<Gates>;
  protocolCredential: PartialDeep<Credential>;
};

export function GateViewContent({
  gateProps,
  protocolCredential,
}: GateViewContentProps) {
  const { me, hasuraUserService } = useAuth();
  const [open, setOpen] = useState(false);
  const isAdmin = isDaoAdmin({ me, gate: gateProps });
  const gateStatus = useGateStatus(gateProps);

  const credential = useCredentialByGateId({ gateId: gateProps?.id });

  const gateProgress = useQuery(['gate_progress', gateProps?.id, me?.id], () =>
    hasuraUserService.GateProgress({
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
      hasuraPublicService.direct_credential_info({
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
        protocolCredential={protocolCredential}
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
                hasCredential={gateStatus?.isCompleted}
                gateId={gateProps.id}
                totalHolders={
                  directCredentialInfo.data?.whitelisted_wallets_aggregate
                    ?.aggregate.count
                }
                isAdmin={isAdmin}
                directCredentialInfo={directCredentialInfo}
                completedAt={credential?.credentials_by_pk?.created_at}
              />
            }
          />
        )}
      {/* {gateProps.published === 'not_published' &&
        gateProps.type === 'direct' && (
          <>
            <DraftDirectHoldersList gate={gateProps} />
          </>
        )} */}
      {gateProps.type === 'task_based' && (
        <TaskList
          gate={gateProps}
          completedAt={completedAt}
          completedTasksCount={gateStatus?.completedTasksCount}
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
