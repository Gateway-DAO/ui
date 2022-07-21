import { Search } from '@mui/icons-material';
import { Chip, TextField, Autocomplete } from '@mui/material';

import { useAuth } from '../../providers/auth';

export const CreatedByInput = ({ set, ...props }) => {
  const { me } = useAuth();
  const creators = [{ id: me?.id, name: me?.name }];

  return (
    <Autocomplete
      multiple
      id="created_by-input"
      options={creators.map((creator) => creator.name)}
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
        <TextField {...params} label="Created By" id="created_by" {...props} />
      )}
      onChange={(event) => set(creators)}
    />
  );
};

export default CreatedByInput;
