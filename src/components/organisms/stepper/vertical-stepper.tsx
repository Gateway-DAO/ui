import useTranslation from 'next-translate/useTranslation';

import { Typography, Stack, Box } from '@mui/material';
import Stepper from '@/components/organisms/stepper/stepper';

type Props = {
  activeStep: number;
  title: string;
  steps: {
    title: string;
  }[];
};

export default function VerticalStepper({
  title,
  steps,

  activeStep,
}: Props) {
  return (
    <Stack>
      <Typography variant="h4" mb={5}>
        {title}
      </Typography>
      <Box mb={5}>
        <Stepper steps={steps} activeStep={activeStep} behaviour="dynamic" />
      </Box>
    </Stack>
  );
}
