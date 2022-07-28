import { Search } from '@mui/icons-material';
import { Chip, TextField, Autocomplete } from '@mui/material';

import { SKILLS } from '../../constants/skills';

export const SkillsInput = ({ set, ...props }) => {
  return (
    <Autocomplete
      multiple
      id="skills-input"
      options={[...SKILLS.SOFT, ...SKILLS.HARD]}
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
        <TextField {...params} label="Skills" id="skills" {...props} />
      )}
      onChange={(event, skills) => set(skills)}
    />
  );
};

export default SkillsInput;
