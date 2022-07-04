import { useFormContext } from 'react-hook-form';

import { Search } from '@mui/icons-material';
import { Autocomplete, Stack, TextField } from '@mui/material';

import { useAuth } from '../../../providers/auth';
import { CreateGateTypes } from './schema';

type Props = {
  updateValue: (field: string, value: string) => void;
  updateArray: (field: string, categories: string[]) => void;
  onSubmit: (data: CreateGateTypes) => void;
  isLoading: boolean;
};

const categories = ['Onboarding', 'Beginner'];
const skills = ['Skill A', 'Skill B', 'Skill C'];

export function GateDetailsForm({ updateValue, updateArray, onSubmit }: Props) {
  const {
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
        onChange={(e) => updateValue('title', e.target.value)}
        error={!!errors.title}
        helperText={errors.title?.message}
      />
      <Autocomplete
        multiple
        id="categories"
        options={categories}
        popupIcon={<Search />}
        onChange={(e, value) => updateArray('categories', value)}
        renderInput={(params) => (
          <TextField
            {...params}
            required
            label="Categories"
            error={!!errors.categories}
            helperText={errors.categories && 'Please enter valid categories'}
          />
        )}
      />
      <TextField
        required
        multiline
        minRows={4}
        label="Description"
        id="description"
        onChange={(e) => updateValue('description', e.target.value)}
        error={!!errors.description}
        helperText={errors.description?.message}
      />
      <Autocomplete
        multiple
        id="skills"
        options={skills}
        popupIcon={<Search />}
        onChange={(e, value) => updateArray('skills', value)}
        renderInput={(params) => (
          <TextField
            {...params}
            required
            label="Skills"
            error={!!errors.skills}
            helperText={errors.skills && 'Please enter valid skills'}
          />
        )}
      />
      <Autocomplete
        multiple
        readOnly
        id="created_by"
        options={[me.name]}
        defaultValue={[me.name]}
        popupIcon={<Search />}
        onChange={(e, value) => updateArray('created_by', value)}
        renderInput={(params) => (
          <TextField
            {...params}
            required
            label="Created By"
            error={!!errors.created_by}
            helperText={errors.created_by?.message}
          />
        )}
      />
    </Stack>
  );
}
