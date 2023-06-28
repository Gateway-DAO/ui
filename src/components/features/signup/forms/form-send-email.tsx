import { useState } from 'react';

import { useFormContext } from 'react-hook-form';

import { Stack } from '@mui/material';

import { ChooseGatewayId } from '../sections/choose-gateway-id';
import { SignUpMethods } from '../sections/signup-methods';
import { EmailSignUpProgress } from '../utlis';
import { NewUserSchema } from '../utlis/schema';

type Props = {
  onSubmitSendEmail: (data: NewUserSchema) => void;
  isLoading: boolean;
};

/*
  TODO: Disable submit button on form error
  */

export function FormSendEmail({ onSubmitSendEmail, isLoading }: Props) {
  const [signUpSteps, setSignUpSteps] = useState(0);

  const { handleSubmit } = useFormContext<NewUserSchema>();

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
