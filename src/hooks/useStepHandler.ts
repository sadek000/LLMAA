import { useCallback, useState } from "react";

export const useStepHandler = (totalSteps: number) => {
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === totalSteps - 1;

  const handleNext = useCallback(() => {
    setActiveStep((currentStep) => (isLastStep ? currentStep : currentStep + 1));
  }, [isLastStep]);

  const handleBack = useCallback(() => {
    setActiveStep((currentStep) => (currentStep > 0 ? currentStep - 1 : 0));
  }, []);

  return { activeStep, handleNext, handleBack, isLastStep };
};
