import { useFormContext } from 'react-hook-form';

import { Stack, TextField } from '@mui/material';

import CategoriesInput from '../../molecules/categories-input';
import CreatedByInput from '../../molecules/creators-input';
import SkillsInput from '../../molecules/skills-input';
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
    setValue,
  } = useFormContext<CreateGateTypes>();

  return (
    <Stack
      component="form"
      id="gate-details-form"
      direction="column"
      gap={2}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        label="Title"
        id="title"
        {...register('title')}
        error={!!errors.title}
        helperText={errors.title?.message}
      />
      <CategoriesInput
        label="Categories"
        id="categories"
        multiline
        name="categories"
        error={!!errors.categories}
        errors={errors.categories}
        helperText={errors.categories && 'Invalid categories added'}
        sx={{
          width: '100%',
        }}
        set={(categories: string[]) => {
          setValue('categories', categories);
        }}
      />
      <TextField
        multiline
        minRows={4}
        label="Description"
        id="description"
        {...register('description')}
        error={!!errors.description}
        helperText={errors.description?.message}
      />
      <SkillsInput
        label="Skills"
        id="skills"
        multiline
        name="skills"
        error={!!errors.skills}
        errors={errors.skills}
        helperText={errors.skills && 'Invalid skills added'}
        sx={{
          width: '100%',
        }}
        set={(skills: string[]) => {
          setValue('skills', skills);
        }}
      />
      <CreatedByInput
        label="Created By"
        id="created_by"
        multiline
        name="created_by"
        error={!!errors.created_by}
        errors={errors.created_by}
        helperText={errors.created_by && 'Invalid creator added'}
        sx={{
          width: '100%',
        }}
        set={(created_by: string[]) => {
          setValue('created_by', created_by);
        }}
      />
    </Stack>
  );
}
