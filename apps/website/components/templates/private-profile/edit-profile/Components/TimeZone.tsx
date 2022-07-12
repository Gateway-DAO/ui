import { useState } from 'react';
import {
  Grid,
  Stack,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';

export function TimeZone() {
  const [timeZone, setTimeZone] = useState('');
  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      alignItems="flex-start"
      gap={6}
      sx={{ marginBottom: '10%' }}
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
          >
            Time Zone
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Stack width={{ sx: '100%', md: '65%' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">SELECT YOUR TIME ZONE</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={timeZone}
                label="SELECT YOUR TIME ZONE"
                onChange={(e) => setTimeZone(e.target.value)}
              >
                <MenuItem value={"EST"} >Eastern Standard Time (EST), UTC -5</MenuItem>
                <MenuItem value={"ETC"} >International Date Line West, UTC -12</MenuItem>
                <MenuItem value={"CST"} >Coordinated Universal Time, UTC -11</MenuItem>
                <MenuItem value={"EST1"} >Hawaii, UTC -10</MenuItem>
                {/* <MenuItem value={"EST2"} >Alaska, UTC -9</MenuItem>
                <MenuItem value={"EST3"} >Baja California, UTC -8</MenuItem>
                <MenuItem value={"EST4"} >Pacific Time (US and Canada), UTC -8</MenuItem> */}
              </Select>
            </FormControl>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
