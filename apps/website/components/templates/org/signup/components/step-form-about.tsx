import useTranslation from 'next-translate/useTranslation';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { TextField } from '@mui/material';

import { AboutSchema, aboutSchema } from '../schema';
import StepFormHeader from './step-form-header';

type Props = {
  handleStep: (newValue: boolean) => void;
};

export default function StepFormAbout({ handleStep }: Props) {
  const methods = useForm<AboutSchema>({
    resolver: yupResolver(aboutSchema),
    mode: 'all',
  });
  const { t } = useTranslation('org-signup');
  const { register, formState } = methods;
  return (
    <FormProvider {...methods}>
      <StepFormHeader
        title={t('step-about.title')}
        description={t('step-about.description')}
      />
      <TextField
        required
        label={t('step-about.label')}
        type="text"
        id="org_about"
        {...register('about')}
        error={!!formState?.errors?.about}
        helperText={formState?.errors.about?.message}
        sx={{ mb: 5 }}
      />
    </FormProvider>
  );
}
