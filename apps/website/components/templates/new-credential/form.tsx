import { useRouter } from 'next/router';

import { useFormContext } from 'react-hook-form';

import { Button, Stack, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { mockCategories } from './__mock__';
import { NewCredentialSchema } from './schema';

/* TODO: Change hardcoded text to translate */
/* TODO: Where does the categories comes from */
/* FIXME: Select label background on focus */
type Props = {
  onSubmit: (data?: NewCredentialSchema) => void;
};
export function Form({ onSubmit }: Props) {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext<NewCredentialSchema>();

  return (
    <Stack
      component="form"
      direction="column"
      gap={2}
      onSubmit={handleSubmit(onSubmit)}
    >
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
          {mockCategories.map((category) => (
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
      {/* NOTE: validate each line with https://github.com/Swyftx/crypto-address-validator */}
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
      <Stack
        direction="row-reverse"
        justifyContent="end"
        gap={1}
        sx={{ mt: 2 }}
      >
        <Button variant="contained" type="submit">
          Submit
        </Button>
        <Button
          variant="outlined"
          type="button"
          onClick={() => {
            router.back();
          }}
        >
          Cancel
        </Button>
      </Stack>
    </Stack>
  );
}
