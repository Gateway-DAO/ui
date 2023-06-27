import useTranslation from 'next-translate/useTranslation';

import { gateway_discord, gateway_support_email } from '@/constants/socials';

import { Typography, Stack, Box, Button, Link } from '@mui/material';
import { SuccessfullyIcon } from '@/components/atoms/icons';
import { ROUTES } from '@/constants/routes';
import Stepper from '@/components/organisms/stepper/stepper';

export default function VerticalStepper({ activeStep }: { activeStep: number }) {
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
