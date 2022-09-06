import { FieldErrors } from 'react-hook-form';

import { Search } from '@mui/icons-material';
import { Chip, TextField, Autocomplete, TextFieldProps } from '@mui/material';

import { SKILLS } from '../../constants/skills';

type SkillsInputProps = {
  set: (categories: string[]) => void;
  defaultValue?: string[];
} & TextFieldProps &
  FieldErrors;

export const SkillsInput = ({
  set,
  defaultValue,
  ...props
}: SkillsInputProps) => {
  return (
    <Autocomplete
      multiple
      id="skills-input"
      options={[...SKILLS.HARD, ...SKILLS.SOFT]}
      defaultValue={defaultValue}
      groupBy={(option) =>
        SKILLS.HARD.includes(option) ? 'Hard Skills' : 'Soft Skills'
      }
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
