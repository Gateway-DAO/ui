import { paramCase } from 'change-case';
import { useFormContext } from 'react-hook-form';

import { Button, Stack, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { NewCredentialSchema } from './schema';

/* TODO: Change hardcoded text to translate */
/* TODO: Where does the categories comes from */
/* FIXME: Select label background on focus */

const categories = ['Credential', 'User'].map((category) => ({
  value: paramCase(category),
  label: category,
}));

export function Form() {
  const {
    register,
    formState: { errors },
  } = useFormContext<NewCredentialSchema>();

  return (
    <Stack direction="column" gap={2}>
      <TextField
        required
        label="Title"
        id="name"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <FormControl fullWidth>
        <InputLabel variant="outlined" htmlFor="category">
          Category
        </InputLabel>
        <Select id="category" {...register('category')}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.value} value={category.value}>
              {category.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        required
        label="Description"
        id="description"
        multiline
        minRows={4}
        {...register('description')}
        error={!!errors.description}
        helperText={errors.description?.message}
      />
      <TextField
        required
        label="Wallets Adressess"
        id="wallets"
        multiline
        minRows={3}
        {...register('wallets')}
        error={!!errors.wallets}
        helperText={
          'Enter one address per line' +
          (errors.wallets ? `\n${errors.wallets?.message}` : '')
        }
      />
    </Stack>
  );
}
