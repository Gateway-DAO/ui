import { useFormContext } from 'react-hook-form';

import { Checkbox, FormControlLabel, Stack, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { mockLevels } from './__mock__';
import { CredentialDetailsTypes } from './credential-details-schema';

type Props = {
  onRoleUpdate: (value: string) => void;
  onCommitmentLevelUpdate: (value: string) => void;
  onStartDateUpdate: (value: string) => void;
  onEndDateUpdate: (value: string) => void;
  onIsStillWorkingUpdate: (value: boolean) => void;
  onResponsibilitiesUpdate: (value: string) => void;
};

export function CredentialDetailsForm({
  onRoleUpdate,
  onCommitmentLevelUpdate,
  onStartDateUpdate,
  onEndDateUpdate,
  onIsStillWorkingUpdate,
  onResponsibilitiesUpdate,
}: Props) {
  const {
    //register,
    formState: { errors },
  } = useFormContext<CredentialDetailsTypes>();

  return (
    <Stack direction="column" gap={2}>
      {/* Role */}
      <TextField
        required
        label="Role"
        id="role"
        onChange={(e) => onRoleUpdate(e.target.value)}
        //{...register('role')}
        error={!!errors.role}
        helperText={errors.role?.message}
      />
      {/* Level of commitment */}
      <FormControl fullWidth>
        <InputLabel variant="outlined" htmlFor="commitment_level">
          Level of commitment
        </InputLabel>
        <Select
          id="commitment_level"
          onChange={(e) => onCommitmentLevelUpdate(e.target.value.toString())}
          //{...register('commitment_level')}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {mockLevels.map((level) => (
            <MenuItem key={level.value} value={level.value}>
              {level.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Start and end dates */}
      <TextField
        required
        label="Start date"
        id="start_date"
        onChange={(e) => onStartDateUpdate(e.target.value)}
        //{...register('start_date')}
        error={!!errors.start_date}
        helperText={errors.start_date?.message}
      />
      <TextField
        required
        label="End date"
        id="end_date"
        onChange={(e) => onEndDateUpdate(e.target.value)}
        //{...register('end_date')}
        error={!!errors.end_date}
        helperText={errors.end_date?.message}
      />
      <FormControlLabel
        control={
          <Checkbox
            name="currently_working"
            onChange={(e) => onIsStillWorkingUpdate(!!e.target.value)}
            //{...register('currently_working')}
          />
        }
        label="I'm currently working on this role"
      />
      {/* Responsibilities */}
      <TextField
        required
        label="Day to day responsibilities"
        id="responsibilities"
        multiline
        minRows={4}
        onChange={(e) => onResponsibilitiesUpdate(e.target.value)}
        //{...register('responsibilities')}
        error={!!errors.responsibilities}
        helperText={errors.responsibilities?.message}
      />
    </Stack>
  );
}
