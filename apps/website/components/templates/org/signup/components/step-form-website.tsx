import useTranslation from 'next-translate/useTranslation';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { TextField } from '@mui/material';

import { WebsiteSchema, websiteSchema } from '../schema';
import StepFormHeader from './step-form-header';

type Props = {
  handleStep: (newValue: boolean) => void;
};

export default function StepFormWebsite({ handleStep }: Props) {
  const methods = useForm<WebsiteSchema>({
    resolver: yupResolver(websiteSchema),
    mode: 'all',
  });
  const { t } = useTranslation('org-signup');
  const { register, formState } = methods;
  return (
    <FormProvider {...methods}>
      <StepFormHeader
        title={t('step-website.title')}
        description={t('step-website.description')}
      />
      <TextField
        required
        label={t('step-website.label')}
        type="text"
        id="org_website"
        {...register('website')}
        error={!!formState?.errors?.website}
        helperText={formState?.errors.website?.message}
      />
    </FormProvider>
  );
}
