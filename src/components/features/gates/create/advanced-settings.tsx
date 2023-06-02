import { useState, ChangeEvent } from 'react';

import { DateTime } from 'luxon';
import { Controller, useFormContext } from 'react-hook-form';
import { useLocalStorage } from 'react-use';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import {
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
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { CreateGateData } from './schema';

const StyledToggleButton = styled(ToggleButton)(() => ({
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
    register,
    control,
  } = useFormContext<CreateGateData>();
  const [hiddenDevFields] = useLocalStorage('devmode');

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
                      <DatePicker
                        disablePast
                        inputFormat="MM/dd/yyyy"
                        label="Add expire date"
                        value={
                          field.value ? DateTime.fromISO(field.value) : null
                        }
                        onChange={(date: DateTime) => {
                          field.onChange(date?.toISO());
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            inputProps={{
                              ...params.inputProps,
                              placeholder: 'mm/dd/yyyy',
                            }}
                          />
                        )}
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
          {hiddenDevFields && (
            <Stack sx={{ width: '100%' }} gap={2}>
              <Typography gutterBottom variant="body1" sx={{ mb: 1 }}>
                Loyalty Program
              </Typography>
              <TextField
                label="Loyalty Program ID"
                id="loyalty_id"
                {...register('loyalty_id')}
                error={!!errors.loyalty_id}
                helperText={errors.loyalty_id?.message}
                sx={{
                  '& div fieldset legend span': {
                    marginRight: 0.5,
                  },
                }}
              />
              <TextField
                label="Data Model ID"
                id="data_model_id"
                {...register('data_model_id')}
                defaultValue="4fcb512e-5b40-465d-8e9e-a38343600aa0"
                error={!!errors.data_model_id}
                helperText={errors.data_model_id?.message}
                sx={{
                  '& div fieldset legend span': {
                    marginRight: 0.5,
                  },
                }}
              />
              <TextField
                label="Points"
                id="points"
                {...register('points', {
                  valueAsNumber: true,
                })}
                error={!!errors.points}
                helperText={errors.points?.message}
                sx={{
                  '& div fieldset legend span': {
                    marginRight: 0.5,
                  },
                }}
              />
            </Stack>
          )}
        </Stack>
      </Collapse>
    </section>
  );
}
