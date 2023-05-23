import useTranslation from 'next-translate/useTranslation';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { TextField } from '@mui/material';

import { NameSchema, nameSchema } from '../schema';
import StepFormHeader from './step-form-header';

type Props = {
  handleStep: (newValue: boolean) => void;
};

export default function StepFormName({ handleStep }: Props) {
  const methods = useForm<NameSchema>({
    resolver: yupResolver(nameSchema),
    mode: 'all',
  });
  const { t } = useTranslation('org-signup');
  const { register, formState } = methods;
  return (
    <FormProvider {...methods}>
      <StepFormHeader
        title={t('step-name.title')}
        description={t('step-name.description')}
      />
      <TextField
        required
        label={t('step-name.label')}
        type="text"
        id="org_name"
        {...register('name')}
        error={!!formState?.errors?.name}
        helperText={formState?.errors.name?.message}
        sx={{ mb: 5 }}
      />
    </FormProvider>
  );
}
