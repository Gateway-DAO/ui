import { useState } from 'react';

export function useMultistepForm(steps: any[]) {
  const [currentStep, setCurrentStep] = useState(0);

  function changeStep(i: number, e?: any) {
    if (e) e.preventDefault();

    if (i < 0 || i >= steps.length) return;

    setCurrentStep(i);
  }

  return {
    currentStep,
    currentComponent: steps[currentStep],
    changeStep,
    isLastStep: currentStep === steps.length - 1,
    isFirstStep: currentStep === 0,
  };
}
