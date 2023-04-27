import { PartialDeep } from 'type-fest';

import { Grid, Divider } from '@mui/material';

import { useCredentialByGateId } from '../../../hooks/use-credential-by-gate-id';
import { useGateStatus } from '../../../hooks/use-gate-status';
import { Gates } from '../../../services/hasura/types';
import { GateViewSidebar } from './gate-view-sidebar';
import { GateViewTasks } from './gate-view-tasks';

type GateViewProps = {
  gateProps: PartialDeep<Gates>;
  credentialProtocol?: PartialDeep<Credential>;
};

export function GateViewTemplate({
  gateProps,
  credentialProtocol,
}: GateViewProps) {
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
      <GateViewSidebar
        completedGate={gateStatus.isCompleted}
        credential={credential}
        gateProps={gateProps}
        credentialProtocol={credentialProtocol}
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
