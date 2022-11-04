import useTranslation from 'next-translate/useTranslation';

import { useFormContext } from 'react-hook-form';

import SearchIcon from '@mui/icons-material/Search';
import { Stack, TextField } from '@mui/material';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';

import { LANGUAGES } from '../../../../../constants/user';

export function Languages() {
  const languages = Object.keys(LANGUAGES).map((key) => LANGUAGES[key].name);
  const { control, setValue, watch } = useFormContext();
  const { t } = useTranslation('settings');

  return (
    <Stack direction="column" sx={{ mb: 3 }}>
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
            label={t('profile.select-your-languages')}
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
  );
}
