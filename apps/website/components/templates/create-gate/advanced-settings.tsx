import { useState, ChangeEvent } from 'react';

import { DateTime } from 'luxon';
import { Controller, useFormContext } from 'react-hook-form';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Collapse,
  Stack,
  Typography,
  ToggleButton,
  InputAdornment,
  TextField,
  FormHelperText,
  FormControl,
} from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { DesktopDatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { CreateGateData } from './schema';

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  '&.MuiToggleButton-root': {
    fontWeight: 700,
    minWidth: '64px',
    color: '#FFFFFF',
  },
  '&.Mui-selected , &.Mui-selected:hover': {
    border: '2px solid #9A53FF',
  },
}));

const claimLimitValues = [
  { label: '1', value: 1 },
  {
    label: '100',
    value: 100,
  },
  {
    label: '1000',
    value: 1000,
  },
  {
    label: '10000',
    value: 10000,
  },
  {
    label: 'unlimited',
    value: null,
  },
];

export function AdvancedSetting() {
  const [collapse, setCollapse] = useState(false);
  const {
    formState: { errors },
    setValue,
    control,
    getValues,
  } = useFormContext<CreateGateData>();

  return (
    <section>
      <Button
        variant="text"
        endIcon={collapse ? <ExpandLess /> : <ExpandMore />}
        onClick={() => setCollapse(!collapse)}
      >
        advanced settings
      </Button>
      <Collapse in={collapse} timeout="auto" unmountOnExit>
        <Stack spacing={3} padding={1}>
          <div>
            <Typography gutterBottom variant="body1">
              Expire date
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              color="text.secondary"
              marginBottom={4}
            >
              Set a expiration date to claim the credential
            </Typography>
            <Stack>
              <LocalizationProvider dateAdapter={AdapterLuxon}>
                <Controller
                  control={control}
                  name="expire_date"
                  defaultValue={null}
                  render={({ field }) => (
                    <>
                      <MobileDatePicker
                        label="Add expire date"
                        inputFormat="MM/dd/yyyy"
                        disablePast
                        value={
                          field.value ? DateTime.fromISO(field.value) : null
                        }
                        onChange={(date: DateTime) => {
                          field.onChange(date?.toISO());
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </>
                  )}
                />
              </LocalizationProvider>
              <Stack sx={{ marginTop: '13px', width: '250px' }}>
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                  <Controller
                    control={control}
                    name="expire_date"
                    defaultValue={null}
                    render={({ field }) => (
                      <>
                        <TimePicker
                          label="Add expire time"
                          value={
                            field.value ? DateTime.fromISO(field.value) : null
                          }
                          onChange={(newValue) => {
                            field.onChange(newValue?.toISO());
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              inputProps={{
                                ...params.inputProps,
                                placeholder: 'hh:mm am/pm',
                              }}
                            />
                          )}
                        />
                      </>
                    )}
                  />
                </LocalizationProvider>
              </Stack>
            </Stack>
          </div>
          <div>
            <Typography gutterBottom variant="body1">
              Amount limit
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              color="text.secondary"
              marginBottom={4}
            >
              Limit amount of people who can claim the credential
            </Typography>
            <Controller
              name="claim_limit"
              control={control}
              defaultValue={null}
              render={({ field: { onChange, value, ref } }) => {
                const isCustomValue = !claimLimitValues.some(
                  (btn) => btn.value === value
                );

                return (
                  <FormControl>
                    <Stack
                      direction={'row'}
                      sx={{
                        flexDirection: { xs: 'column', md: 'row' },
                      }}
                      gap={2}
                    >
                      <>
                        {claimLimitValues.map((btn) => {
                          return (
                            <StyledToggleButton
                              aria-label={btn.label}
                              key={btn.value}
                              value={btn.value}
                              color="primary"
                              size={'medium'}
                              sx={{
                                px: 3,
                              }}
                              selected={value === btn.value}
                              onClick={() => {
                                onChange(btn.value);
                              }}
                            >
                              {btn.label}
                            </StyledToggleButton>
                          );
                        })}
                      </>

                      <OutlinedInput
                        aria-label="others"
                        key={'cutom-input'}
                        size="small"
                        value={isCustomValue ? value : ''}
                        error={!!errors?.claim_limit}
                        placeholder="OTHERS"
                        type="number"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          if (e.target.value === '') {
                            onChange(null);
                          } else {
                            onChange(e.target.valueAsNumber);
                          }
                        }}
                        sx={[
                          isCustomValue && {
                            border: '2px solid #9A53FF',
                          },
                        ]}
                        endAdornment={
                          <InputAdornment position="end">
                            <EditIcon />
                          </InputAdornment>
                        }
                        ref={ref}
                      />
                    </Stack>
                    {!!errors.claim_limit && (
                      <FormHelperText error id="outlined-weight-helper-text">
                        {errors?.claim_limit?.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                );
              }}
            />
          </div>
        </Stack>
      </Collapse>
    </section>
  );
}
