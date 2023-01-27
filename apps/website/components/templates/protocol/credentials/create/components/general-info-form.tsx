import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { DateTime } from 'luxon';
import { Controller, useFormContext } from 'react-hook-form';

import { brandColors } from '@gateway/theme';

import { alpha, Stack, TextField, Typography } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { CATEGORIES } from '../../../../../../constants/gate';
import { useAuth } from '../../../../../../providers/auth';
import { gatewayProtocolSDK } from '../../../../../../services/gateway-protocol/api';
import { CreateCredentialInput } from '../../../../../../services/gateway-protocol/types';

const CategoriesInput = dynamic(
  () => {
    return import('../../../../../../components/molecules/categories-input');
  },
  { ssr: false }
);

export default function GeneralInfoForm() {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<CreateCredentialInput>();

  const { t } = useTranslation('protocol');
  const { me } = useAuth();

  const issuer = useQuery(
    ['issuer', me?.wallet],
    () =>
      gatewayProtocolSDK.userByWallet({
        wallet: me?.wallet,
      }),
    {
      select: (data) => data?.userByWallet,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (issuer?.data) {
      setValue('issuerId', issuer?.data?.id);
    }
  }, [issuer, setValue]);

  return (
    <Stack>
      <Typography fontWeight={600}>
        {t('data-model.issue-credential.group-general-title')}
      </Typography>
      <Typography
        fontSize={14}
        sx={{ color: alpha(brandColors.white.main, 0.7), mb: 3 }}
      >
        {t('data-model.issue-credential.group-general-description')}
      </Typography>
      <Stack gap={3}>
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
          label={t('data-model.issue-credential.title-label')}
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
          label={t('data-model.issue-credential.description-label')}
          id="description"
          {...register(`description`)}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <CategoriesInput
          variant="outlined"
          label={t('data-model.issue-credential.categories-label')}
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
          <Typography variant="body1">
            {t('data-model.issue-credential.expire-date-title')}
          </Typography>
          <Typography variant="body2" color="text.secondary" marginBottom={2}>
            {t('data-model.issue-credential.expire-date-description')}
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
                      label={t('data-model.issue-credential.expire-date-label')}
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
    </Stack>
  );
}
