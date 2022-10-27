import { getTimeZones } from '@vvo/tzdb';
import { useFormContext } from 'react-hook-form';

import {
  Stack,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import useTranslation from 'next-translate/useTranslation';

export function TimeZone() {
  const { setValue, watch } = useFormContext();
  const TZ = getTimeZones();
  const { t } = useTranslation('settings');

  return (
    <Stack
      direction="column"
      sx={{ mb: 3 }}
      width={{ sx: '100%', md: '65%' }}
    >
      <FormControl fullWidth>
        <InputLabel
          sx={{
            '&.MuiInputLabel-shrink ': {
              textTransform: 'uppercase',
            },
          }}
          id="demo-simple-select-label"
        >
          {t('profile.select-your-time-zone')}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={watch('timezone')}
          label={t('profile.select-your-time-zone')}
          sx={{
            '& fieldset legend span': {
              marginRight: '22px',
            },
          }}
          onChange={(e) => setValue('timezone', e.target.value)}
        >
          {TZ.map((timezone) => (
            <MenuItem key={timezone.name} value={timezone.name}>
              {timezone.rawFormat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
