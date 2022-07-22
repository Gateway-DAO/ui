import { useState } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';

import { TOKENS } from '@gateway/theme';

import { Avatar, Grid, Stack, Typography } from '@mui/material';

import { EditUserSchema } from '../schema';
import { ExperienceAccordion } from './experience';

export function Experiences() {
  const { control, watch } = useFormContext<EditUserSchema>();

  const { fields: experiences } = useFieldArray({
    control,
    name: 'experiences',
  });

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
            {experiences.length > 0 ? (
              experiences.map((experience, index) => (
                <ExperienceAccordion
                  key={index}
                  experience={experiences[index]}
                />
              ))
            ) : (
              <Stack
                direction="row"
                sx={{
                  background: '#9A53FF14',
                  p: 3,
                  border: '1px dotted #9A53FF',
                  borderRadius: 1,
                }}
              >
                <Avatar
                  sx={{
                    marginRight: (theme) => theme.spacing(2),
                  }}
                ></Avatar>
                <Stack>
                  <Typography variant="body1">Explore Gates</Typography>
                  <Typography
                    variant="body2"
                    color={(theme) => theme.palette.text.secondary}
                  >
                    Complete an onboarding gate and start to contribute at DAO
                  </Typography>
                </Stack>
              </Stack>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
