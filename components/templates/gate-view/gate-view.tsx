import { PartialDeep } from 'type-fest';

import { Grid, Divider } from '@mui/material';

import { Gates } from '@/services/hasura/types';
import { GateViewSidebar } from './gate-view-sidebar';
import { GateViewTasks } from './gate-view-tasks';

type GateViewProps = {
  gateProps: PartialDeep<Gates>;
  protocolCredential?: PartialDeep<Credential>;
};

export function GateViewTemplate({
  gateProps,
  protocolCredential,
}: GateViewProps) {
  return (
    <Grid
      container
      sx={{
        flexWrap: 'nowrap',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <GateViewSidebar
        gateProps={gateProps}
        protocolCredential={protocolCredential}
      />
      <Divider orientation="vertical" flexItem />
      <GateViewTasks
        protocolCredential={protocolCredential}
        gateProps={gateProps}
      />
    </Grid>
  );
}
