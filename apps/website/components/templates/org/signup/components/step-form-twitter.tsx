import useTranslation from 'next-translate/useTranslation';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { TextField } from '@mui/material';

import { TwitterSchema, twitterSchema } from '../schema';
import StepFormHeader from './step-form-header';

type Props = {
  handleStep: (newValue: boolean) => void;
};

export default function StepFormTwitter({ handleStep }: Props) {
  const methods = useForm<TwitterSchema>({
    resolver: yupResolver(twitterSchema),
    mode: 'all',
  });
  const { t } = useTranslation('org-signup');
  const { register, formState } = methods;
  return (
    <FormProvider {...methods}>
      <StepFormHeader
        title={t('step-twitter.title')}
        description={t('step-twitter.description')}
      />
      <TextField
        required
        label={t('step-twitter.label')}
        type="text"
        id="org_twitter"
        {...register('twitter')}
        error={!!formState?.errors?.twitter}
        helperText={formState?.errors.twitter?.message}
        sx={{ mb: 5 }}
      />
    </FormProvider>
  );
}
