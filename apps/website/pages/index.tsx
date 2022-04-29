import { Navbar } from '@gateway/ui';

import { Box, Button, Divider, Stack, Typography } from '@mui/material';

import { mockDaos } from '../__mock__/daos';
import { DashboardTemplate } from '../components/templates/dashboard';

/* TODO: Pass text to i18n */

export function Index() {
  return (
    <DashboardTemplate
      followingDaos={mockDaos}
      containerProps={{ sx: { pt: 2 } }}
    >
      <Navbar />
      <Typography variant="h4" whiteSpace="pre-line">
        Welcome,{'\n'}Lucas Inacio
      </Typography>
      <Stack
        direction="column"
        divider={<Divider />}
        sx={{
          section: {
            py: 4,
          },
        }}
      >
        <Box component="section">
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Typography variant="h6">Recommended Gates</Typography>
              <Typography variant="caption">
                Your journey starts now.
              </Typography>
            </Box>
            <Button>View more gates</Button>
          </Stack>
        </Box>
        <Box component="section">
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Typography variant="h6">Recommended DAOs</Typography>
              <Typography variant="caption">
                We thought you'd like some DAOs recommendations.
              </Typography>
            </Box>
            <Button>View more DAOs</Button>
          </Stack>
        </Box>
        <Box component="section">
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Typography variant="h6">Featured people</Typography>
              <Typography variant="caption">
                Follow the most prominent professionals on the Web3.
              </Typography>
            </Box>
            <Button>view more people</Button>
          </Stack>
        </Box>
      </Stack>
    </DashboardTemplate>
  );
}

export default Index;
