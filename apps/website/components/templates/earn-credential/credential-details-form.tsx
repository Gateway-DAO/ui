import { useFormContext } from 'react-hook-form';

import { Checkbox, FormControlLabel, Stack, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { mockLevels } from './__mock__';
import { CredentialDetailsSchema } from './credential-details-schema';

type Props = {
  onSubmit: (data?: CredentialDetailsSchema) => void;
};

export function CredentialDetailsForm({ onSubmit }: Props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext<CredentialDetailsSchema>();

  return (
    <Stack
      component="form"
      direction="column"
      gap={2}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Role */}
      <TextField
        required
        label="Role"
        id="role"
        {...register('role')}
        error={!!errors.role}
        helperText={errors.role?.message}
      />
      {/* Level of commitment */}
      <FormControl fullWidth>
        <InputLabel variant="outlined" htmlFor="commitment_level">
          Level of commitment
        </InputLabel>
        <Select id="commitment_level" {...register('commitment_level')}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {mockLevels.map((level) => (
            <MenuItem key={level.value} value={level.value}>
              {level.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Start and end dates */}
      <TextField
        required
        label="start_date"
        id="start_date"
        {...register('start_date')}
        error={!!errors.start_date}
        helperText={errors.start_date?.message}
      />
      <TextField
        required
        label="end_date"
        id="end_date"
        {...register('end_date')}
        error={!!errors.end_date}
        helperText={errors.end_date?.message}
      />
      <FormControlLabel
        control={
          <Checkbox
            name="currently_working"
            {...register('currently_working')}
          />
        }
        label="I'm currently working on this role"
      />
      {/* Responsabilities */}
      <TextField
        required
        label="Day to day responsabilities"
        id="responsabilities"
        multiline
        minRows={4}
        {...register('responsabilities')}
        error={!!errors.responsabilities}
        helperText={errors.responsabilities?.message}
      />
    </Stack>
  );
}
