import { Dispatch } from 'react';

import {
  aboutSchema,
  categoriesSchema,
  emailSchema,
  gatewayIdSchema,
  nameSchema,
  roleSchema,
  telegramSchema,
  twitterSchema,
  websiteSchema,
} from '../schema';
import StepCreateProfile from './step-create-profile';
import StepFormFactory from './step-form-factory';
import StepSuccess from './step-success';

type Props = {
  updateFormState: Dispatch<any>;
  handleStep: (value: boolean) => void;
  fullFormState: any;
};

export const setUpFormComponents = ({
  updateFormState,
  handleStep,
  fullFormState,
}: Props): JSX.Element[] => {
  return [
    <StepCreateProfile key={1} />,
    <StepFormFactory
      updateFormState={updateFormState}
      key={2}
      handleStep={handleStep}
      input={{
        name: 'name',
        type: 'text',
        required: true,
      }}
      schema={nameSchema}
    />,
    <StepFormFactory
      updateFormState={updateFormState}
      key={3}
      handleStep={handleStep}
      input={{
        name: 'gatewayId',
        type: 'text',
        required: true,
        startAdornment: '@',
        helperText: `mygateway.xyz/org/${
          fullFormState?.gatewayId || 'gatewayId'
        }`,
      }}
      schema={gatewayIdSchema}
    />,
    <StepFormFactory
      updateFormState={updateFormState}
      key={4}
      handleStep={handleStep}
      input={{
        name: 'categories',
        type: 'text',
        required: true,
      }}
      schema={categoriesSchema}
    />,
    <StepFormFactory
      updateFormState={updateFormState}
      key={5}
      handleStep={handleStep}
      input={{
        name: 'about',
        type: 'text',
        required: true,
        multiline: true,
      }}
      schema={aboutSchema}
    />,
    <StepFormFactory
      updateFormState={updateFormState}
      key={6}
      handleStep={handleStep}
      input={{
        name: 'website',
        type: 'text',
        required: true,
        initialValue: 'https://',
      }}
      schema={websiteSchema}
    />,
    <StepFormFactory
      updateFormState={updateFormState}
      key={7}
      handleStep={handleStep}
      input={{
        name: 'email',
        type: 'text',
        required: true,
      }}
      schema={emailSchema}
    />,
    <StepFormFactory
      updateFormState={updateFormState}
      key={8}
      handleStep={handleStep}
      input={{
        name: 'role',
        type: 'text',
        required: true,
      }}
      schema={roleSchema}
    />,
    <StepFormFactory
      updateFormState={updateFormState}
      key={9}
      handleStep={handleStep}
      input={{
        name: 'twitter',
        type: 'text',
        required: true,
        startAdornment: '@',
      }}
      schema={twitterSchema}
    />,
    <StepFormFactory
      key={10}
      updateFormState={updateFormState}
      handleStep={handleStep}
      input={{
        name: 'telegram',
        type: 'text',
        startAdornment: '@',
      }}
      schema={telegramSchema}
    />,
    <StepSuccess formState={fullFormState} key={11} />,
  ];
};
