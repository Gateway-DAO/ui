import { brandColors } from '@/theme';

import { Box, Stack, alpha } from '@mui/material';

type Status = 'previous' | 'next' | 'current';

const Step = ({ status }: { status: Status }) => {
  const color = {
    previous: alpha(brandColors.purple.main, 0.3),
    current: brandColors.purple.main,
    next: alpha(brandColors.white.main, 0.15),
  };
  return (
    <Box
      sx={{
        height: '4px',
        borderRadius: '4px',
        width: '100%',
        display: 'flex',
        backgroundColor: color[status],
      }}
    />
  );
};

export default function FormStepper({
  qtdSteps,
  currentStep,
}: {
  qtdSteps: number;
  currentStep: number;
}) {
  const StepsList = () => {
    const steps = [];
    for (let i = 0; i < qtdSteps; i++) {
      let status: Status = 'next';
      if (currentStep > i) status = 'previous';
      if (currentStep === i) status = 'current';
      steps.push(<Step status={status} key={i} />);
    }
    return <>{steps}</>;
  };
  return (
    <Stack flexDirection="row" justifyContent="space-between" gap={0.5}>
      <StepsList />
    </Stack>
  );
}
