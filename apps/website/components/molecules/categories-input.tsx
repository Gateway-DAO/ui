import { Search } from '@mui/icons-material';
import { Chip, TextField, Autocomplete } from '@mui/material';

import { categories } from '../../constants/gates';

export const CategoriesInput = ({ set, ...props }) => {
  return (
    <Autocomplete
      multiple
      id="categories-input"
      options={categories}
      popupIcon={<Search />}
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
