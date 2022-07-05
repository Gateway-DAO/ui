import { Search } from '@mui/icons-material';
import { Chip, TextField, Autocomplete } from '@mui/material';

const skills = ['Skill A', 'Skill B', 'Skill C'];

export const SkillsInput = ({ set, ...props }) => {
  return (
    <Autocomplete
      multiple
      id="skills-input"
      options={skills}
      popupIcon={<Search />}
      renderTags={(value: string[], getTagProps) =>
        value.map((option: string, index: number) => (
          <Chip
            key={index}
            variant="filled"
            label={option}
            color={
              props.errors
                ?.map((error) => error.message || null)
                .includes(`${option} is not a valid skills`)
                ? 'error'
                : 'default'
            }
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Skills"
          id="skills"
          multiline
          {...props}
        />
      )}
      onChange={(event, skills) => set(skills)}
    />
  );
};

export default SkillsInput;
