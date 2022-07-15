import { useState } from 'react';

import { TOKENS } from '@gateway/theme';

import { Grid, Stack, Typography } from '@mui/material';

import ExperienceAccordion from './ExperienceComponents/ExperienceAccordion';

export function Experiences() {
  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      alignItems="flex-start"
      gap={6}
      p={TOKENS.CONTAINER_PX}
    >
      {/* TimeZone */}
      <Grid
        container
        direction={{ xs: 'column', md: 'row' }}
        sx={{ rowGap: '15px', marginTop: '24px', alignItems: 'flex-start' }}
      >
        <Grid item xs={4}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ color: '#fff' }}
            ml={{ xs: '0px', md: '40px' }}
          >
            Experience
          </Typography>
        </Grid>
        <Grid item xs={7.5} maxWidth="100%">
          <Stack gap={2}>
            <ExperienceAccordion title="Olympus Dao" />
            <ExperienceAccordion title="Yearn Finance" />
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
