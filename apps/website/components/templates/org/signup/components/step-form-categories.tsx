import useTranslation from 'next-translate/useTranslation';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { TextField } from '@mui/material';

import { CategoriesSchema, categoriesSchema } from '../schema';
import StepFormHeader from './step-form-header';

type Props = {
  handleStep: (newValue: boolean) => void;
};

export default function StepFormCategories({ handleStep }: Props) {
  const methods = useForm<CategoriesSchema>({
    resolver: yupResolver(categoriesSchema),
    mode: 'all',
  });
  const { t } = useTranslation('org-signup');
  const { register, formState } = methods;
  return (
    <FormProvider {...methods}>
      <StepFormHeader
        title={t('step-categories.title')}
        description={t('step-categories.description')}
      />
      <TextField
        required
        label={t('step-categories.label')}
        type="text"
        id="org_categories"
        {...register('categories')}
        error={!!formState?.errors?.categories}
        helperText={formState?.errors.categories?.message}
      />
    </FormProvider>
  );
}
