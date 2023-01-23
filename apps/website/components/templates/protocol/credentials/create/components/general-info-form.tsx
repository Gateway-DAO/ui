import { DateTime } from 'luxon';
import { Controller, useFormContext } from 'react-hook-form';

import { brandColors } from '@gateway/theme';

import { alpha, Stack, TextField, Typography } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import CategoriesInput from '../../../../../../components/molecules/categories-input';
import { CATEGORIES } from '../../../../../../constants/gate';
import { CreateCredentialInput } from '../../../../../../services/gateway-protocol/types';

export default function GeneralInfoForm() {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<CreateCredentialInput>();

  return (
    <>
      <Typography fontWeight={600}>Add details</Typography>
      <Typography
        fontSize={14}
        sx={{ color: alpha(brandColors.white.main, 0.7), mb: 3 }}
      >
        Add the details of the credential
      </Typography>
      <Stack sx={{ mb: 3 }} gap={3}>
        <TextField
          autoFocus
          InputProps={{
            disableUnderline: true,
            sx: {
              '&.Mui-focused': {
                borderBottom: '2px solid #9A53FF',
              },
            },
          }}
          label="Title"
          id="title"
          {...register(`title`)}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <TextField
          multiline
          rows={2}
          InputProps={{
            disableUnderline: true,
            sx: {
              '&.Mui-focused': {
                borderBottom: '2px solid #9A53FF',
              },
            },
          }}
          label="Description"
          id="description"
          {...register(`description`)}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <CategoriesInput
          variant="outlined"
          label="Categories"
          id="categories"
          name="categories"
          error={!!errors.tags}
          {...register('tags')}
          categories={CATEGORIES}
          helperText={errors.tags?.message?.toString()}
          sx={{
            width: '100%',
            '& div fieldset legend span': {
              marginRight: '10px',
            },
            maxWidth: '400px',
          }}
          set={(tags: string[]) => {
            setValue('tags', tags);
          }}
        />
        <Stack>
          <Typography variant="body1">Expire date</Typography>
          <Typography variant="body2" color="text.secondary" marginBottom={2}>
            Set a expiration date to claim the credential
          </Typography>
          <Stack sx={{ maxWidth: '400px' }}>
            <LocalizationProvider dateAdapter={AdapterLuxon}>
              <Controller
                control={control}
                name="expirationDate"
                defaultValue={null}
                render={({ field }) => (
                  <>
                    <MobileDatePicker
                      label="Add expire date"
                      inputFormat="MM/dd/yyyy"
                      disablePast
                      value={field.value ? DateTime.fromISO(field.value) : null}
                      onChange={(date: DateTime) => {
                        field.onChange(date?.toISO());
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </>
                )}
              />
            </LocalizationProvider>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
