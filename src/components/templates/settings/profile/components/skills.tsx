import { useFormContext } from 'react-hook-form';

import SearchIcon from '@mui/icons-material/Search';
import { Stack, TextField } from '@mui/material';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';

import { SKILLS } from '@/constants/skills';

export function Skills() {
  const skills = SKILLS.HARD.concat(SKILLS.SOFT);
  const { control, watch, setValue } = useFormContext();

  return (
    <Stack direction="column" sx={{ mb: 3 }}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={skills}
        defaultValue={watch('skills')}
        disableClearable
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select your skills"
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
        onChange={(event, value) => setValue('skills', value)}
      />
    </Stack>
  );
}
