import { useState } from 'react';

import { useFormContext } from 'react-hook-form';

import { TOKENS } from '@gateway/theme';

import SearchIcon from '@mui/icons-material/Search';
import {
  Grid,
  Stack,
  Typography,
  Divider,
  Chip,
  TextField,
} from '@mui/material';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';

import { LANGUAGES } from '../../../../../constants/user';

export function Languages() {
  const languages = Object.keys(LANGUAGES).map((key) => LANGUAGES[key].name);

  const { control, setValue, watch } = useFormContext();

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
            mb={{ xs: '27px', md: '0px' }}
          >
            Languages
          </Typography>
        </Grid>
        <Grid item xs={7.5}>
          <Stack>
            <Autocomplete
              fullWidth
              multiple
              id="tags-standard"
              options={languages}
              defaultValue={watch('languages')}
              disableClearable
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  {...params}
                  label="Select your languages"
                  sx={{
                    '& label.Mui-focused': {
                      textTransform: 'uppercase',
                    },
                    '& label.MuiInputLabel-shrink ': {
                      textTransform: 'uppercase',
                    },
                    '& div fieldset legend span': {
                      marginRight: '30px',
                      paddingRight: '4px',
                    },
                  }}
                />
              )}
              popupIcon={<SearchIcon />}
              sx={{
                width: { xs: '94vw', md: '65%' },
                [`& .${autocompleteClasses.popupIndicator}`]: {
                  transform: 'none',
                  color: 'rgba(255, 255, 255, 0.56)',
                },
              }}
              onChange={(event, value) => setValue('languages', value)}
            />
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
