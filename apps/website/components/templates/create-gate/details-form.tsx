import { useMemo } from 'react';

import { useFormContext } from 'react-hook-form';

import { Stack, TextField } from '@mui/material';

import { CATEGORIES } from '../../../constants/gate';
import { useAuth } from '../../../providers/auth';
import CategoriesInput from '../../molecules/categories-input';
import CreatedByInput from '../../molecules/creators-input';
import SkillsInput from '../../molecules/skills-input';
import { CreateGateData } from './schema';

export function GateDetailsForm() {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext<CreateGateData>();
  const { me } = useAuth();
  const creators = useMemo(() => ({ id: me?.id, name: me?.name }), [me]);
  const { categories } = getValues();

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
        defaultValue={categories}
        {...register('categories')}
        categories={CATEGORIES}
        helperText={errors.categories?.message}
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
      <CreatedByInput
        label="Created By"
        id="creator"
        name="creator"
        disabled
        {...register('creator')}
        creators={[creators]}
        defaultValue={[creators]}
        error={!!errors.creator}
        errors={errors.creator}
        helperText={errors.creator && 'Invalid creator added'}
        sx={{
          width: '100%',
          '& div fieldset legend span': {
            marginRight: '6px',
          },
        }}
        set={(creator) => setValue('creator', creator)}
      />
    </Stack>
  );
}
