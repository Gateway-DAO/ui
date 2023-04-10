import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState, useEffect, ComponentType } from 'react';

import { useQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';

import { Grid, Divider } from '@mui/material';

import { useAuth } from '../../../providers/auth';
import { gqlAnonMethods } from '../../../services/hasura/api';
import { Gates } from '../../../services/hasura/types';
import { MintDialogProps } from '../../molecules/mint-dialog';
import type { Props as HolderDialogProps } from '../../organisms/holder-dialog';
import { GateViewSidebar } from './gate-view-sidebar';
import { GateViewTasks } from './gate-view-tasks';

const MintDialog: ComponentType<MintDialogProps> = dynamic(
  () => import('../../molecules/mint-dialog').then((mod) => mod.MintDialog),
  { ssr: false }
);

const HolderDialog: ComponentType<HolderDialogProps> = dynamic(
  () => import('../../organisms/holder-dialog').then((mod) => mod.HolderDialog),
  { ssr: false }
);

type GateViewProps = {
  gateProps: PartialDeep<Gates>;
};

export function GateViewTemplate({ gateProps }: GateViewProps) {
  const [isHolderDialog, setIsHolderDialog] = useState(false);
  const [isMintDialog, setMintModal] = useState(false);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [published, setPublished] = useState(gateProps?.published);
  const router = useRouter();

  const { me, gqlAuthMethods } = useAuth();

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
        gateProps.published === 'published',
    }
  );

  const countSimiliarIds = (arr1: string[], arr2?: string[]) => {
    return arr1.filter((id) => !!arr2?.includes(id)).length;
  };

  const taskIds = gateProps?.tasks?.map((task) => task.id);

  useEffect(() => {
    const completedTaskIds =
      me?.task_progresses
        .filter((task) => task.completed == 'done')
        .map((task) => task.task_id) || [];

    setCompletedTasksCount(countSimiliarIds(completedTaskIds, taskIds));
  }, [taskIds, me?.task_progresses, gateProps, router]);

  const completedGate =
    gateProps.type === 'direct'
      ? directCredentialInfo.data?.hasCredential?.aggregate?.count > 0
      : completedTasksCount === gateProps?.tasks?.length;

  const isAdmin =
    me?.permissions?.filter(
      (permission) =>
        permission.dao_id === gateProps?.dao?.id && permission.dao?.is_admin
    ).length > 0;

  const credential_id = me?.credentials?.find(
    (cred) => cred?.gate_id === gateProps?.id
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

  const isLimitExceeded = gateProps?.claim_limit
    ? gateProps?.claim_limit <= gateProps?.holder_count
    : false;

  return (
    <Grid
      container
      sx={{
        flexWrap: 'nowrap',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <HolderDialog
        {...{
          isHolderDialog,
          setIsHolderDialog,
          credentialId: gateProps?.id,
        }}
      />
      <MintDialog
        credential={credential?.credentials_by_pk}
        isOpen={isMintDialog}
        setOpen={setMintModal}
      />
      <GateViewSidebar
        published={published}
        setPublished={setPublished}
        completedGate={completedGate}
        credential={credential}
        gateProps={gateProps}
        isAdmin={isAdmin}
        isLimitExceeded={isLimitExceeded}
        setMintModal={setMintModal}
      />
      <Divider orientation="vertical" flexItem />
      <GateViewTasks
        completedGate={completedGate}
        credential={credential}
        gateProps={gateProps}
        isAdmin={isAdmin}
        published={published}
        completedTasksCount={completedTasksCount}
      />
    </Grid>
  );
}
