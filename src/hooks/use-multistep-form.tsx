import { useState } from 'react';

export function useMultistepForm(steps: any[]) {
  const [currentStep, setCurrentStep] = useState(0);

  function changeStep(i: number, e?: any) {
    if (e) e.preventDefault();

    if (i < 0 || i >= steps.length) return;

    setCurrentStep(i);
  }

  function getInitialStateStepValidity(firstStepEnabled?: boolean) {
    return steps.reduce((acc, _, index) => {
      if (index === 0 && firstStepEnabled) {
        acc[index] = true;
        return acc;
      }
      acc[index] = false;
      return acc;
    }, {});
  }

  return {
    currentStep,
    currentComponent: steps[currentStep],
    changeStep,
    getInitialStateStepValidity,
    isLastStep: currentStep === steps.length - 1,
    isFirstStep: currentStep === 0,
  };
}
