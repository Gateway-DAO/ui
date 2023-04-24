import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';

import { DateTime } from 'luxon';
import { Controller, useFormContext } from 'react-hook-form';

import { isToday } from '@gateway/helpers';
import { brandColors } from '@gateway/theme';

import { alpha, Box, Stack, TextField, Typography } from '@mui/material';
import { MobileDatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { CATEGORIES } from '../../../../../../constants/gate';
import { CreateCredentialInput } from '../../../../../../services/gateway-protocol/types';
import { ImageField } from './image-field';

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
    getValues,
  } = useFormContext<CreateCredentialInput>();

  const { t } = useTranslation('protocol');

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
      <Stack
        sx={{
          display: 'flex',
          flexDirection: false ? 'row-reverse' : 'row',
          justifyContent: '',
          gap: '45px',
        }}
      >
        <ImageField />
        <Box sx={{ mt: 5 }}>
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
        </Box>
      </Stack>
    </Stack>
  );
}
