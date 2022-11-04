import useTranslation from 'next-translate/useTranslation';

import { useFormContext } from 'react-hook-form';

import { Stack, Typography, TextField } from '@mui/material';

export function Form() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const bioChar = 200 - (watch('bio')?.length ?? 0);
  const { t } = useTranslation('settings');

  return (
    <Stack sx={{ width: '100%', mb: 5 }}>
      <Typography sx={{ color: '#fff', fontSize: '16px', mb: 4 }}>
        {t('profile.details')}
      </Typography>
      <Stack
        component="form"
        direction="column"
        gap={2}
        width={{ sx: '100%', md: '65%' }}
      >
        <TextField
          required
          sx={{
            '& div fieldset legend span': {
              marginRight: '2px',
              paddingRight: '0px',
            },
            '& label.Mui-focused': {
              textTransform: 'uppercase',
            },
            '& label.MuiFormLabel-filled': {
              textTransform: 'uppercase',
            },
          }}
          label={t('profile.display-name')}
          id="name"
          {...register('name', { required: true })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          sx={{
            '& div fieldset legend span': {
              marginRight: '2px',
              paddingRight: '0px',
            },
            '& label.Mui-focused': {
              textTransform: 'uppercase',
            },
            '& label.MuiFormLabel-filled': {
              textTransform: 'uppercase',
            },
          }}
          required
          label={t('profile.username')}
          id="username"
          {...register('username', { required: true })}
          error={!!errors.username}
          helperText={
            errors.username?.message ?? t('profile.username-helper-text')
          }
        />
        <TextField
          sx={{
            '& div fieldset legend span': {
              marginRight: '4px',
              paddingRight: '4px',
            },
            '& label.Mui-focused': {
              textTransform: 'uppercase',
            },
            '& label.MuiFormLabel-filled': {
              textTransform: 'uppercase',
            },
          }}
          multiline
          minRows={4}
          required
          label={t('profile.your-bio')}
          id="bio"
          inputProps={{ maxLength: 200 }}
          {...register('bio', { required: true })}
          error={!!errors.bio}
          helperText={errors.bio?.message}
        />
        <Typography
          sx={{
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.7)',
            margin: '-10px 10px',
          }}
        >
          {bioChar} / 200
        </Typography>
      </Stack>
    </Stack>
  );
}
