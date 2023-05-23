import useTranslation from 'next-translate/useTranslation';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { TextField } from '@mui/material';

import { RoleSchema, roleSchema } from '../schema';
import StepFormHeader from './step-form-header';

type Props = {
  handleStep: (newValue: boolean) => void;
};

export default function StepFormRole({ handleStep }: Props) {
  const methods = useForm<RoleSchema>({
    resolver: yupResolver(roleSchema),
    mode: 'all',
  });
  const { t } = useTranslation('org-signup');
  const { register, formState } = methods;
  return (
    <FormProvider {...methods}>
      <StepFormHeader
        title={t('step-role.title')}
        description={t('step-role.description')}
      />
      <TextField
        required
        label={t('step-role.label')}
        type="text"
        id="org_role"
        {...register('role')}
        error={!!formState?.errors?.role}
        helperText={formState?.errors.role?.message}
        sx={{ mb: 5 }}
      />
    </FormProvider>
  );
}
