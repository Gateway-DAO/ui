import { useFormContext } from 'react-hook-form';

import { Stack, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { mockTypes } from './__mock__';
import { AccomplishmentsSchema } from './accomplishments-schema';

type Props = {
  onSubmit: (data?: AccomplishmentsSchema) => void;
};

export function AccomplishmentsForm({ onSubmit }: Props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext<AccomplishmentsSchema>();

  return (
    <Stack
      component="form"
      direction="column"
      gap={2}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Title */}
      <TextField
        required
        label="Accomplishment Title"
        id="accomplishment_title"
        {...register('accomplishment_title')}
        error={!!errors.accomplishment_title}
        helperText={errors.accomplishment_title?.message}
      />
      {/* Accomplishment Description */}
      <TextField
        required
        label="Accomplishment Description"
        id="accomplishment_description"
        multiline
        minRows={4}
        {...register('accomplishment_description')}
        error={!!errors.accomplishment_description}
        helperText={errors.accomplishment_description?.message}
      />
      {/* Proof of Work: Type */}
      <FormControl fullWidth>
        <InputLabel variant="outlined" htmlFor="pow_type">
          Type
        </InputLabel>
        <Select id="pow_type" {...register('pow_type')}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {mockTypes.map((type) => (
            <MenuItem key={type.value} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Proof of Work: Link */}
      <TextField
        required
        label="Link"
        id="pow_link"
        {...register('pow_link')}
        error={!!errors.pow_link}
        helperText={errors.pow_link?.message}
      />
      {/* Proof of Work: Description */}
      <TextField
        required
        label="Description"
        id="pow_description"
        multiline
        minRows={4}
        {...register('pow_description')}
        error={!!errors.pow_description}
        helperText={errors.pow_description?.message}
      />
    </Stack>
  );
}
