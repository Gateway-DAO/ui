import { useFormContext } from 'react-hook-form';

import { Button, Stack, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { NewDAOSchema } from './schema';

/* FIXME: Select label background on focus */

export function Form() {
  const {
    register,
    formState: { errors },
  } = useFormContext<NewDAOSchema>();

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
        {/* <Select id="category" {...register('category')}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {[].map((category) => (
            <MenuItem key={category.value} value={category.value}>
              {category.label}
            </MenuItem>
          ))}
        </Select> */}
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
      {/* NOTE: validate each line with https://github.com/Swyftx/crypto-address-validator */}
      {/* <TextField
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
      /> */}
      <Stack
        direction="row-reverse"
        justifyContent="end"
        gap={1}
        sx={{ mt: 2 }}
      >
        <Button variant="contained" type="submit">
          Submit
        </Button>
        <Button variant="outlined" type="button">
          Cancel
        </Button>
      </Stack>
    </Stack>
  );
}
