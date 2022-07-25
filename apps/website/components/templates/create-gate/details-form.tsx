import { useFormContext } from 'react-hook-form';

import { Stack, TextField } from '@mui/material';

import CategoriesInput from '../../molecules/categories-input';
import CreatedByInput from '../../molecules/creators-input';
import SkillsInput from '../../molecules/skills-input';
import { CreateGateTypes, Creator } from './schema';

export function GateDetailsForm() {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<CreateGateTypes>();

  return (
    <Stack direction="column" gap={2}>
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
        name="created_by"
        error={!!errors.created_by}
        errors={errors.created_by}
        helperText={errors.created_by && 'Invalid creator added'}
        sx={{
          width: '100%',
        }}
        defaultValue={{}}
        set={(created_by: Creator[]) => setValue('created_by', created_by)}
      />
    </Stack>
  );
}
