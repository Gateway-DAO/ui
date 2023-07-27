import {
  Box,
  Divider,
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
import { useToggle } from 'react-use';
import { CreateGateSchema } from '../create-direct-credential';
import useTranslation from 'next-translate/useTranslation';

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
  } = useFormContext<CreateGateSchema>();
  const [showDateAndTime, toggleShowDateAndTime] = useToggle(false);

  const { t } = useTranslation('quest');

  useEffect(() => {
    handleStep(isValid);
  }, [isValid]);

  return (
    <Stack direction={'column'} mx={7} mb={5} sx={{ height: '100%' }}>
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
        </Stack>
      </Box>
    </Stack>
  );
}
