import { useFormContext } from "react-hook-form";
import * as React from "react";
import {
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
//date picker components
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { mockLevels } from "./__mock__";
import { CredentialDetailsTypes } from "./credential-details-schema";

type Props = {
  isStillWorking: boolean;
  onRoleUpdate: (value: string) => void;
  onCommitmentLevelUpdate: (value: string) => void;
  onStartDateUpdate: (value: string) => void;
  onEndDateUpdate: (value: string) => void;
  onIsStillWorkingUpdate: (value: boolean) => void;
  onResponsibilitiesUpdate: (value: string) => void;
};

export function CredentialDetailsForm({
  isStillWorking,
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
  //date picker states
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
          <InputLabel htmlFor="commitment_level">
            Level of commitment
          </InputLabel>
          <Select
            id="commitment_level"
            onChange={(e) => onCommitmentLevelUpdate(e.target.value.toString())}
            label="Level of commitment"
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
        <Typography
          variant="caption"
          sx={{ textTransform: "uppercase", display: "block" }}
        >
          Time period of contribution
        </Typography>
        {/* Start and end dates */}
        <DatePicker
          disableFuture
          label="Start date"
          inputFormat="dd-MM-yyyy"
          openTo="year"
          views={["year", "month", "day"]}
          value={startDate}
          onChange={(newValue) => {
            setStartDate(newValue);
          }}
          renderInput={(params) => (
            <TextField
              error={!!errors.start_date}
              helperText={errors.start_date?.message}
              {...params}
            />
          )}
        />
        <DatePicker
          disablePast
          label="End date"
          inputFormat="dd-MM-yyyy"
          openTo="year"
          views={["year", "month", "day"]}
          value={endDate}
          onChange={(newValue) => {
            setEndDate(newValue);
            
          }}
          renderInput={(params) => (
            <TextField
              disabled={isStillWorking}
              id="end_date"
              error={!!errors.end_date}
              helperText={errors.end_date?.message}
              {...params}
            />
          )}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="currently_working"
              checked={isStillWorking}
              onChange={(e) => {
                onIsStillWorkingUpdate(!!e.target.checked);
              }}
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
    </LocalizationProvider>
  );
}
