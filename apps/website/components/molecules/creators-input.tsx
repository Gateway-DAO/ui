import { Search } from '@mui/icons-material';
import { Chip, TextField, Autocomplete } from '@mui/material';

export const CreatedByInput = ({ set, creators, ...props }) => {
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
      defaultValue={[creators[0].name]}
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
      onChange={() => set(creators)}
    />
  );
};

export default CreatedByInput;
