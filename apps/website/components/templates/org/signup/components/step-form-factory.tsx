import { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useLocalStorage } from '@solana/wallet-adapter-react';
import { FormProvider, useForm, Resolver, Path } from 'react-hook-form';

import { TextField } from '@mui/material';

import StepFormHeader from './step-form-header';

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
};

export default function StepFormFactory<T>({
  handleStep,
  title,
  description,
  schema,
  input,
}: StepFormProps<T>) {
  const methods = useForm<T>({
    resolver: yupResolver(schema) as Resolver<T, object>,
    mode: 'all',
  });

  const { register, formState, watch, setValue, trigger } = methods;
  const { isValid } = formState;
  const [formValue, updateFormValue] = useLocalStorage('org_creation', null);

  useEffect(() => {
    if (formValue && formValue[input.name]) {
      console.log(formValue);
      setValue(input.name, formValue[input.name]);
      trigger(input.name);
    }
  }, []);

  useEffect(() => {
    handleStep(isValid);
  }, [isValid]);

  const fieldName = input.name as string;
  const fieldValue = watch(input.name);

  return (
    <FormProvider {...methods}>
      <StepFormHeader title={title} description={description} />
      <TextField
        label={input.label}
        type={input.type}
        id={`org_${input.name}`}
        {...register(input.name)}
        name={fieldName}
        error={!!formState?.errors?.[fieldName]}
        helperText={formState?.errors[fieldName]?.message}
        sx={{ mb: 5 }}
        onBlur={() => {
          updateFormValue({ ...formValue, [fieldName]: fieldValue });
        }}
      />
    </FormProvider>
  );
}
