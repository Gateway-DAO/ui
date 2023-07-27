import {
  Box,
  Divider,
  FormControl,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
  Stack,
  Switch,
  TextField,
  ToggleButton,
  Typography,
} from '@mui/material';
import { DateTime } from 'luxon';
import { Dispatch, ChangeEvent, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

import { Controller, useFormContext } from 'react-hook-form';
import EditIcon from '@mui/icons-material/Edit';
import { useToggle } from 'react-use';
import { CreateGateData } from '../../schema';
import useTranslation from 'next-translate/useTranslation';

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

export default function OptionalSettingsTemplate({
  updateFormState,
  handleStep,
  input,
}: {
  updateFormState: Dispatch<any>;
  handleStep: (value: boolean) => void;
  input: any;
}) {
  const {
    formState: { errors, isValid },
    register,
    control,
  } = useFormContext<CreateGateData>();
  const { t } = useTranslation('quest');
  const [showDateAndTime, toggleShowDateAndTime] = useToggle(false);
  const [showClaimLimit, toggleShowClaimLimit] = useToggle(false);

  useEffect(() => {
    handleStep(isValid);
  }, [isValid]);

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

  return (
    <Stack direction={'column'} mx={7} mb={5}>
      <Box>
        <Typography variant="h5">
          {t('template.optional-setting.title')}
        </Typography>
        <Typography variant="body2">
          {t('template.optional-setting.desc')}
        </Typography>
        <Stack mt={6} direction={'column'}>
          <Stack direction={'row'} alignItems={'center'} py={5}>
            <Switch
              onChange={toggleShowDateAndTime}
              sx={{ alignSelf: 'flex-start' }}
            />

            <Stack direction={'column'} mx={2}>
              <Typography variant="subtitle1" color={'text.primary'}>
                {t('template.optional-setting.expire-date-and-time')}
              </Typography>
              <Typography variant="body2" color={'text.secondary'}>
                {t('template.optional-setting.desc-date-and-time')}
              </Typography>
              {showDateAndTime && (
                <Stack mt={6}>
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
                  <Stack mt={2}>
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
                                field.value
                                  ? DateTime.fromISO(field.value)
                                  : null
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
              )}
            </Stack>
            <Divider />
          </Stack>
          <Stack
            direction={'row'}
            alignItems={'center'}
            divider={<Divider />}
            py={5}
          >
            <Switch
              onChange={toggleShowClaimLimit}
              sx={{ alignSelf: 'flex-start' }}
            />
            <Stack direction={'column'} mx={2}>
              <Typography variant="subtitle1" color={'text.primary'}>
                {t('template.optional-setting.amount-limit')}
              </Typography>
              <Typography variant="body2" color={'text.secondary'}>
                {t('template.optional-setting.amount-desc')}
              </Typography>
              {showClaimLimit && (
                <div>
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
                            mt={6}
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
                            <FormHelperText
                              error
                              id="outlined-weight-helper-text"
                            >
                              {errors?.claim_limit?.message}
                            </FormHelperText>
                          )}
                        </FormControl>
                      );
                    }}
                  />
                </div>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
