import { Gates } from '@/services/hasura/types';
import { PartialDeep } from 'type-fest';

import { Grid, Divider } from '@mui/material';

import { GateViewContent } from './gate-view-content';
import { GateViewSidebar } from './gate-view-sidebar';

type GateViewProps = {
  gateProps: PartialDeep<Gates>;
  protocolCredential?: PartialDeep<Credential>;
};

export function GateView({ gateProps, protocolCredential }: GateViewProps) {
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
      <GateViewContent
        protocolCredential={protocolCredential}
        gateProps={gateProps}
      />
    </Grid>
  );
}
