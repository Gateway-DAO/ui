import useTranslation from 'next-translate/useTranslation';

import { Typography, Stack, Box } from '@mui/material';
import Stepper from '@/components/organisms/stepper/stepper';

export default function VerticalStepper({
  activeStep,
}: {
  activeStep: number;
}) {
  const { t } = useTranslation('org-signup');

  const steps = [
    {
      title: 'Template',
    },
    {
      title: 'Details',
    },
    {
      title: 'Tasks',
    },
    {
      title: 'Optional Settings',
    },
  ];

  return (
    <Stack>
      <Typography variant="h4" mb={7}>
        Create a Quest
      </Typography>
      <Box mb={5}>
        <Stepper steps={steps} activeStep={activeStep} />
      </Box>
    </Stack>
  );
}
