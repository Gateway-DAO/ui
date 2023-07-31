import { brandColors } from '@/theme';

import { Check } from '@mui/icons-material';
import { Avatar, Divider, Stack, Typography, alpha } from '@mui/material';

type StepProps = {
  activeStep: number;
  index: number;
  title: string;
  isLast?: boolean;
  behaviour?: 'static' | 'dynamic';
};

const Step = ({
  activeStep,
  index,
  title,
  isLast,
  behaviour = 'static',
}: StepProps) => {
  return (
    <>
      {index !== 0 && (
        <Divider
          orientation="vertical"
          color={
            behaviour === 'dynamic'
              ? activeStep >= index
                ? brandColors.purple.main
                : null
              : isLast
              ? '#332b3e'
              : brandColors.purple.main
          }
          sx={{
            height: '30px',
            width: '2px',
            ml: 1.5,
          }}
          flexItem
        />
      )}
      <Stack direction="row" alignItems="center" gap={2}>
        <Avatar
          sx={{
            ...(behaviour == 'static' && {
              backgroundColor: isLast
                ? alpha(brandColors.white.main, 0.15)
                : brandColors.purple.main,
            }),
            ...(behaviour == 'dynamic' && {
              backgroundColor:
                index <= activeStep
                  ? brandColors.purple.main
                  : alpha(brandColors.white.main, 0.15),
            }),
            width: '24px',
            height: '24px',
            fontSize: index >= activeStep ? '14px' : 'default',
            fontWeight: index >= activeStep ? 700 : 'regular',
          }}
        >
          {index < activeStep ? <Check fontSize="small" /> : <>{index + 1}</>}
        </Avatar>
        <Typography
          variant="body1"
          color={
            index === activeStep
              ? brandColors.white.main
              : alpha(brandColors.white.main, 0.5)
          }
        >
          {title}
        </Typography>
      </Stack>
    </>
  );
};

type StepperProps = {
  steps: { title: string }[];
  activeStep: number;
  behaviour?: 'static' | 'dynamic';
};

export default function Stepper({
  steps,
  activeStep,
  behaviour = 'static',
}: StepperProps) {
  return (
    <Stack direction="column">
      {steps.map((step, index) => (
        <Step
          key={index}
          index={index}
          title={step.title}
          activeStep={activeStep}
          isLast={steps.length === index}
          behaviour={behaviour}
        />
      ))}
    </Stack>
  );
}
