import { useEffect } from 'react';

import { useFormContext } from 'react-hook-form';

import { Stack, TextField } from '@mui/material';

import { useAuth } from '../../../providers/auth';
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
  const { me } = useAuth();
  const creators = [{ id: me?.id, name: me?.name }];

  useEffect(() => {
    setValue('created_by', creators);
  }, []);

  return (
    <Stack direction="column" gap={2}>
      <TextField
        label="Title"
        id="title"
        {...register('title')}
        error={!!errors.title}
        helperText={errors.title?.message}
        sx={{
          '& div fieldset legend span': {
            marginRight: '4px',
          },
        }}
      />
      <CategoriesInput
        label="Categories"
        id="categories"
        name="categories"
        error={!!errors.categories}
        errors={errors.categories}
        {...register('categories')}
        helperText={errors.categories && 'Invalid categories added'}
        sx={{
          width: '100%',
          '& div fieldset legend span': {
            marginRight: '10px',
          },
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
        sx={{
          '& div fieldset legend span': {
            marginRight: '12px',
          },
        }}
      />
      <SkillsInput
        label="Skills"
        id="skills"
        name="skills"
        error={!!errors.skills}
        errors={errors.skills}
        {...register('skills')}
        helperText={errors.skills && 'Invalid skills added'}
        sx={{
          width: '100%',
          '& div fieldset legend span': {
            marginRight: '10px',
          },
        }}
        set={(skills: string[]) => {
          setValue('skills', skills);
        }}
      />
      <CreatedByInput
        label="Created By"
        id="created_by"
        name="created_by"
        disabled
        {...register('created_by')}
        creators={creators}
        defaultValue={creators}
        error={!!errors.created_by}
        errors={errors.created_by}
        helperText={errors.created_by && 'Invalid creator added'}
        sx={{
          width: '100%',
          '& div fieldset legend span': {
            marginRight: '6px',
          },
        }}
        set={(created_by: Creator[]) => setValue('created_by', created_by)}
      />
    </Stack>
  );
}
