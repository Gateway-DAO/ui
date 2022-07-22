import { useState } from 'react';

import { useFormContext } from 'react-hook-form';

import { TOKENS } from '@gateway/theme';

import {
  Grid,
  Stack,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';

import { TZ } from '../../../../../constants/user';

export function TimeZone() {
  const { setValue, watch } = useFormContext();

  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      alignItems="flex-start"
      gap={6}
      sx={{ marginBottom: '10%' }}
      p={TOKENS.CONTAINER_PX}
    >
      {/* TimeZone */}
      <Grid
        container
        direction={{ xs: 'column', md: 'row' }}
        sx={{ rowGap: '15px', marginTop: '24px' }}
      >
        <Grid item xs={4}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ color: '#fff' }}
            ml={{ xs: '0px', md: '40px' }}
            mb={{ xs: '20px', md: '0px' }}
          >
            Time Zone
          </Typography>
        </Grid>
        <Grid item xs={7.5}>
          <Stack width={{ sx: '100%', md: '65%' }}>
            <FormControl fullWidth>
              <InputLabel
                sx={{
                  '&.MuiInputLabel-shrink ': {
                    textTransform: 'uppercase',
                  },
                }}
                id="demo-simple-select-label"
              >
                Select your time zone
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={watch('timezone')}
                label="Select your time zone"
                sx={{
                  '& fieldset legend span': {
                    marginRight: '22px',
                  },
                }}
                onChange={(e) => setValue('timezone', e.target.value)}
              >
                {TZ.map((timezone) => (
                  <MenuItem key={timezone.abbr} value={timezone.abbr}>
                    {timezone.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
