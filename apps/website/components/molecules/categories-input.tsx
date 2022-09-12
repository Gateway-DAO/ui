import { FieldErrors } from 'react-hook-form';

import { Search } from '@mui/icons-material';
import { Chip, TextField, Autocomplete, TextFieldProps } from '@mui/material';

import { CATEGORIES } from '../../constants/gate';

type CategoriesInputProps = {
  set: (categories: string[]) => void;
  defaultValue?: string[];
} & TextFieldProps &
  FieldErrors;

export const CategoriesInput = ({
  set,
  defaultValue,
  ...props
}: CategoriesInputProps) => {
  return (
    <Autocomplete
      multiple
      id="categories-input"
      options={CATEGORIES}
      defaultValue={defaultValue}
      popupIcon={<Search />}
      sx={{
        '&.Mui-focused .MuiButtonBase-root': {
          transform: 'none',
        },
      }}
      renderTags={(value: string[], getTagProps) =>
        value.map((option: string, index: number) => (
          <Chip
            key={index}
            variant="filled"
            label={option}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} label="Categories" id="categories" {...props} />
      )}
      onChange={(event, categories) => set(categories)}
    />
  );
};

export default CategoriesInput;
