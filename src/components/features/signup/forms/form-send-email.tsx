import useTranslation from 'next-translate/useTranslation';

import { useFormContext } from 'react-hook-form';

import { Stack } from '@mui/material';

import { NewUserSchema } from '../utlis/schema';

import { SignUpMethods } from '../sections/signup-methods';
import { ChooseGatewayId } from '../sections/choose-gateway-id';
import { useState } from 'react';
import { EmailSignUpProgress } from '../utlis';

type Props = {
  onSubmitSendEmail: (data: NewUserSchema) => void;
  isLoading: boolean;
};

/*
  TODO: Disable submit button on form error
  */

export function FormSendEmail({ onSubmitSendEmail, isLoading }: Props) {
  const [signUpSteps, setSignUpSteps] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<NewUserSchema>();

  const signUpProgress = {
    0: <SignUpMethods />,
    1: <ChooseGatewayId />,
  };

  return (
    <Stack
      component="form"
      direction="column"
      gap={2}
      onSubmit={handleSubmit(onSubmitSendEmail)}
    >
      <EmailSignUpProgress.Provider value={{ setSignUpSteps, isLoading }}>
        {signUpProgress[signUpSteps]}
      </EmailSignUpProgress.Provider>
    </Stack>
  );
}
