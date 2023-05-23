import useTranslation from 'next-translate/useTranslation';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { TextField } from '@mui/material';

import { TelegramSchema, telegramSchema } from '../schema';
import StepFormHeader from './step-form-header';

type Props = {
  handleStep: (newValue: boolean) => void;
};

export default function StepFormTelegram({ handleStep }: Props) {
  const methods = useForm<TelegramSchema>({
    resolver: yupResolver(telegramSchema),
    mode: 'all',
  });
  const { t } = useTranslation('org-signup');
  const { register, formState } = methods;
  return (
    <FormProvider {...methods}>
      <StepFormHeader
        title={t('step-telegram.title')}
        description={t('step-telegram.description')}
      />
      <TextField
        required
        label={t('step-telegram.label')}
        type="text"
        id="org_telegran"
        {...register('telegram')}
        error={!!formState?.errors?.telegram}
        helperText={formState?.errors.telegram?.message}
        sx={{ mb: 5 }}
      />
    </FormProvider>
  );
}
