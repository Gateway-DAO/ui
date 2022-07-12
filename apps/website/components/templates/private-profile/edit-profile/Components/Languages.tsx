import { useState } from 'react';
import {
  Grid,
  Stack,
  Typography,
  Divider,
  Chip,
  TextField,
} from '@mui/material';

import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import SearchIcon from '@mui/icons-material/Search';

export function Languages() {
  const skills = [
    { title: 'English' },
    { title: 'Spanish' },
    { title: 'Portuguese' },
  ];
  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      alignItems="flex-start"
      gap={6}
    >
      {/* TimeZone */}
      <Grid
        container
        direction={{ xs: 'column', md: 'row' }}
        sx={{ rowGap: '15px',marginTop:"24px", alignItems:"flex-start"}}
      >
        <Grid item xs={4}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ color: '#fff' }}
            ml={{ xs: '0px', md: '40px' }}
          >
            Languages
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Stack width={{ sx: '100%', md: '65%' }}>
            <Autocomplete
              multiple
              id="tags-standard"
              options={skills}
              disableClearable
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="SELECT YOUR LANGUAGES"
                />
              )}
              popupIcon={<SearchIcon />}
              sx={{
                [`& .${autocompleteClasses.popupIndicator}`]: {
                  transform: "none",
                  color:"rgba(255, 255, 255, 0.56)"
                }
              }}
            />
          </Stack>
        </Grid>
      </Grid>
      <Divider light sx={{ width: '100%' }} />
    </Stack>
  );
}
