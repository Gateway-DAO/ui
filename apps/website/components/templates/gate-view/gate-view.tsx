import dynamic from 'next/dynamic';
import { useState, ComponentType } from 'react';

import { PartialDeep } from 'type-fest';

import { Grid, Divider } from '@mui/material';

import { useCredentialByGateId } from '../../../hooks/use-credential-by-gate-id';
import { useGateStatus } from '../../../hooks/use-gate-status';
import { Gates } from '../../../services/hasura/types';
import type { Props as HolderDialogProps } from '../../organisms/holder-dialog';
import { GateViewSidebar } from './gate-view-sidebar';
import { GateViewTasks } from './gate-view-tasks';

const HolderDialog: ComponentType<HolderDialogProps> = dynamic(
  () => import('../../organisms/holder-dialog').then((mod) => mod.HolderDialog),
  { ssr: false }
);

type GateViewProps = {
  gateProps: PartialDeep<Gates>;
};

export function GateViewTemplate({ gateProps }: GateViewProps) {
  const [isHolderDialog, setIsHolderDialog] = useState(false);
  const gateStatus = useGateStatus(gateProps);
  const credential = useCredentialByGateId({ gateId: gateProps?.id });

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
      <GateViewSidebar
        completedGate={gateStatus.isCompleted}
        credential={credential}
        gateProps={gateProps}
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
