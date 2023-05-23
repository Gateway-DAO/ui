import useTranslation from 'next-translate/useTranslation';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { TextField } from '@mui/material';

import { EmailSchema, emailSchema } from '../schema';
import StepFormHeader from './step-form-header';

type Props = {
  handleStep: (newValue: boolean) => void;
};

export default function StepFormEmail({ handleStep }: Props) {
  const methods = useForm<EmailSchema>({
    resolver: yupResolver(emailSchema),
    mode: 'all',
  });
  const { t } = useTranslation('org-signup');
  const { register, formState } = methods;
  return (
    <FormProvider {...methods}>
      <StepFormHeader
        title={t('step-email.title')}
        description={t('step-email.description')}
      />
      <TextField
        required
        label={t('step-email.label')}
        type="text"
        id="org_email"
        {...register('email')}
        error={!!formState?.errors?.email}
        helperText={formState?.errors.email?.message}
        sx={{ mb: 5 }}
      />
    </FormProvider>
  );
}
