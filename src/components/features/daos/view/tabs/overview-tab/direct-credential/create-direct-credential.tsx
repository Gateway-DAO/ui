import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { useMultistepForm } from '@/hooks/use-multistep-form';
import { setUpFormComponents } from './set-up-form-components';

import { CreateCredentialTemplate } from '../base/create-credential';

export function CreateDirectCredentialTemplate({
  closeDialog,
}: {
  closeDialog: () => void;
}) {
  const { t } = useTranslation('quest');
  const [fullFormState, setFullFormState] = useState(null);

  const handleStep = (newValue: boolean) => {
    setStepValidity((prev) => ({ ...prev, [currentStep]: newValue }));
  };

  const formComponents = setUpFormComponents({
    fullFormState,
    handleStep: handleStep,
    updateFormState: setFullFormState,
  });
  const {
    currentComponent: currentStepComponent,
    changeStep,
    currentStep,
    isFirstStep,
    isLastStep,
    getInitialStateStepValidity,
  } = useMultistepForm(formComponents);
  const initialStepValidity = getInitialStateStepValidity(false);
  const [stepValidity, setStepValidity] = useState(initialStepValidity);

  const formStepControl: {
    name: string;
  }[] = [
    { name: t('vertical-steps.template') },
    { name: t('vertical-steps.details') },
    { name: t('vertical-steps.direct-credential-step') },
    { name: t('vertical-steps.optional-setting') },
  ];

  const verticalSteps = [
    {
      title: t('vertical-steps.template'),
    },
    {
      title: t('vertical-steps.details'),
    },
    {
      title: t('vertical-steps.direct-credential-step'),
    },
    {
      title: t('vertical-steps.optional-setting'),
    },
  ];

  return (
    <>
      <CreateCredentialTemplate
        closeDialog={closeDialog}
        formStepControl={formStepControl}
        hash="create-direct-credential"
        type="direct"
        steps={verticalSteps}
        title={t('create-direct-credential.create')}
        changeStep={changeStep}
        currentStep={currentStep}
        currentStepComponent={currentStepComponent}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        setStepValidity={setStepValidity}
        stepValidity={stepValidity}
      />
    </>
  );
}
