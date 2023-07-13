import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';

import { gateway_discord, gateway_support_email } from '@/constants/socials';

import { Typography, Stack, Box, Button, Link } from '@mui/material';

import { ROUTES } from '../../../../../constants/routes';
import { SuccessfullyIcon } from '../../../../atoms/icons/successfully-icon';
import Stepper from '../../../../organisms/stepper/stepper';

export default function StepSuccess({ formState }: { formState: any }) {
  const { t } = useTranslation('org-signup');

  const sendOrgCreatedEvent = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'org_creation', {
        event_category: 'org_creation',
        event_label: 'org_creation_success',
      });
    }
  };

  const steps = [
    {
      title: t('step-success.stepper-1'),
    },
    {
      title: t('step-success.stepper-2'),
    },
    {
      title: t('step-success.stepper-3'),
    },
  ];

  useEffect(() => {
    sendOrgCreatedEvent();
  }, []);

  return (
    <Stack>
      <SuccessfullyIcon sx={{ mb: 4 }} />
      <Typography variant="h4" mb={7}>
        {t('step-success.title')}
      </Typography>
      <Box mb={5}>
        <Stepper steps={steps} activeStep={1} />
      </Box>
      <Typography variant="body1" mb={1}>
        We are reviewing your application.
      </Typography>
      <Typography variant="body1" mb={1}>
        In the meantime you can customize your space, draft credentials, but can
        not issue them publicly.
      </Typography>
      <Typography variant="body1" mb={1}>
        If your application is denied, the profile and all draft credentials
        will be deleted.
      </Typography>
      <Typography variant="body1" mb={1}>
        If you have questions please reach out to us via{' '}
        <Link
          sx={{ textDecoration: 'none' }}
          href={`mailto:${gateway_support_email}`}
        >
          email
        </Link>{' '}
        or{' '}
        <Link
          sx={{ textDecoration: 'none' }}
          href={gateway_discord}
          target="_blank"
        >
          Discord
        </Link>
        .
      </Typography>
      <Box mt={8}>
        <Button
          variant="contained"
          size="large"
          href={ROUTES.DAO_PROFILE.replace('[slug]', formState?.slug)}
        >
          {t('step-success.action')}
        </Button>
      </Box>
    </Stack>
  );
}
