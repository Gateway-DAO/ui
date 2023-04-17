import dynamic from 'next/dynamic';
import { useState, ComponentType } from 'react';

import { useQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';

import { Grid, Divider } from '@mui/material';

import { useGateStatus } from '../../../hooks/use-gate-status';
import { useAuth } from '../../../providers/auth';
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
  const { me, gqlAuthMethods } = useAuth();
  const gateStatus = useGateStatus(gateProps);

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
        completedGate={gateStatus.isCompleted}
        credential={credential}
        gateProps={gateProps}
        isLimitExceeded={isLimitExceeded}
        setMintModal={setMintModal}
      />
      <Divider orientation="vertical" flexItem />
      <GateViewTasks
        completedGate={gateStatus.isCompleted}
        credential={credential}
        gateProps={gateProps}
        completedTasksCount={gateStatus.completedTasksCount}
      />
    </Grid>
  );
}
