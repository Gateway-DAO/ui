import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useLocalStorage } from '@solana/wallet-adapter-react';
import { FormProvider, useForm, Resolver, Path } from 'react-hook-form';

import { TextField } from '@mui/material';

import { CATEGORIES } from '../../../../../constants/gate';
import { localStorageKeys } from '../../../../../constants/local-storage-keys';
import StepFormHeader from './step-form-header';

const CategoriesInput = dynamic(
  () => {
    return import('../../../../molecules/categories-input');
  },
  { ssr: false }
);

type InputProps<T> = {
  label: string;
  required?: boolean;
  name: Path<T>;
  type: string;
};

type StepFormProps<T> = {
  handleStep: (newValue: boolean) => void;
  title: string;
  description: string;
  input: InputProps<T>;
  schema: any;
  updateFormState: (newValue: any) => void;
};

export default function StepFormFactory<T>({
  handleStep,
  title,
  description,
  schema,
  input,
  updateFormState,
}: StepFormProps<T>) {
  const methods = useForm<T>({
    resolver: yupResolver(schema) as Resolver<T, object>,
    mode: 'all',
  });

  const { register, formState, watch, setValue, trigger } = methods;
  const { isValid } = formState;
  const [formValue, updateFormValue] = useLocalStorage(
    localStorageKeys.org_signup,
    null
  );

  useEffect(() => {
    if (formValue && formValue[input.name]) {
      setValue(input.name, formValue[input.name]);
      trigger(input.name);
    }
  }, []);

  useEffect(() => {
    handleStep(isValid);
  }, [isValid]);

  const fieldName = input.name as string;
  const fieldValue = watch(input.name);

  useEffect(() => {
    updateFormState((prev) => ({ ...prev, [fieldName]: fieldValue }));
    console.log('asfa', fieldValue, formValue[input.name]);
  }, [fieldValue]);

  return (
    <FormProvider {...methods}>
      <StepFormHeader title={title} description={description} />
      {fieldName === 'categories' ? (
        <CategoriesInput
          variant="outlined"
          label={input.label}
          id={`org_${fieldName}`}
          name={`org_${fieldName}`}
          error={!!formState?.errors?.[fieldName]}
          {...register(input.name)}
          categories={CATEGORIES}
          helperText={formState?.errors[fieldName]?.message}
          defaultValue={formValue[input.name] ?? []}
          sx={{
            width: '100%',
            '& div fieldset legend span': {
              marginRight: '10px',
            },
            mb: 5,
          }}
          set={(categories: string[]) => {
            setValue(input.name, categories as any);
            updateFormValue({ ...formValue, [fieldName]: categories });
          }}
        />
      ) : (
        <TextField
          label={input.label}
          type={input.type}
          id={`org_${fieldName}`}
          {...register(input.name)}
          name={fieldName}
          error={!!formState?.errors?.[fieldName]}
          helperText={formState?.errors[fieldName]?.message}
          sx={{ mb: 5 }}
          onBlur={() => {
            updateFormValue({ ...formValue, [fieldName]: fieldValue });
          }}
        />
      )}
    </FormProvider>
  );
}
