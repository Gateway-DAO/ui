import { useFormContext } from 'react-hook-form';

import { Stack, TextField } from '@mui/material';

import { useAuth } from '../../../providers/auth';
import TagsInput from '../../molecules/TagsInput';
import { CreateGateTypes } from './schema';

type Props = {
  onSubmit: (data: CreateGateTypes) => void;
  isLoading: boolean;
};

export function GateDetailsForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<CreateGateTypes>();

  const { me } = useAuth();

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
        id="title"
        {...register('title')}
        error={!!errors.title}
        helperText={errors.title?.message}
      />
      <TagsInput
        required
        fullWidth
        label="Category"
        id="categories"
        {...register('categories')}
        error={!!errors.categories}
        helperText={errors.categories && 'Please enter valid categories'}
      />
      <TextField
        required
        multiline
        minRows={4}
        label="Description"
        id="description"
        {...register('description')}
        error={!!errors.description}
        helperText={errors.description?.message}
      />
      <TagsInput
        required
        fullWidth
        label="Admin"
        id="admin"
        locked={true}
        tags={[me?.name]}
        {...register('admin')}
        error={!!errors.admin}
        helperText={errors.admin?.message}
      />
      <TagsInput
        required
        fullWidth
        label="Knowledge"
        id="knowledge"
        {...register('knowledge')}
        error={!!errors.knowledge}
        helperText={errors.knowledge && 'Please enter valid knowledges'}
      />
    </Stack>
  );
}
