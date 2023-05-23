import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { theme } from '@gateway/theme';

import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Box, Button, IconButton, Stack, alpha } from '@mui/material';

import { ROUTES } from '../../../../constants/routes';
import { useMultistepForm } from '../../../../hooks/use-multistep-form';
import Loading from '../../../atoms/loading';
import FormStepper from '../../../molecules/form-stepper/form-stepper';
import StepCreateProfile from './components/step-create-profile';
import StepFormFactory from './components/step-form-factory';
import StepFormTelegram from './components/step-form-telegram';
import {
  aboutSchema,
  categoriesSchema,
  emailSchema,
  gatewayIdSchema,
  nameSchema,
  roleSchema,
  websiteSchema,
} from './schema';

export function OrgSignUpTemplate() {
  const { t } = useTranslation('org-signup');
  const [orgCreated, setOrgCreated] = useState(false);
  const router = useRouter();

  const handleStep = (newValue: boolean) => {
    setStepValidity((prev) => ({ ...prev, [currentStep]: newValue }));
  };

  const [stepValidity, setStepValidity] = useState({
    0: true,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
  });

  const formComponents = [
    <StepCreateProfile key={1} />,
    <StepFormFactory
      key={2}
      handleStep={handleStep}
      title={t('step-name.title')}
      description={t('step-name.description')}
      input={{
        label: t('step-name.label'),
        name: 'name',
        type: 'text',
        required: true,
      }}
      schema={nameSchema}
    />,
    <StepFormFactory
      key={3}
      handleStep={handleStep}
      title={t('step-gateway-id.title')}
      description={t('step-gateway-id.description')}
      input={{
        label: t('step-gateway-id.label'),
        name: 'gatewayId',
        type: 'text',
        required: true,
      }}
      schema={gatewayIdSchema}
    />,
    <StepFormFactory
      key={4}
      handleStep={handleStep}
      title={t('step-categories.title')}
      description={t('step-categories.description')}
      input={{
        label: t('step-categories.label'),
        name: 'categories',
        type: 'text',
        required: true,
      }}
      schema={categoriesSchema}
    />,
    <StepFormFactory
      key={5}
      handleStep={handleStep}
      title={t('step-about.title')}
      description={t('step-about.description')}
      input={{
        label: t('step-about.label'),
        name: 'about',
        type: 'text',
        required: true,
      }}
      schema={aboutSchema}
    />,
    <StepFormFactory
      key={6}
      handleStep={handleStep}
      title={t('step-website.title')}
      description={t('step-website.description')}
      input={{
        label: t('step-website.label'),
        name: 'website',
        type: 'text',
        required: true,
      }}
      schema={websiteSchema}
    />,
    <StepFormFactory
      key={7}
      handleStep={handleStep}
      title={t('step-email.title')}
      description={t('step-email.description')}
      input={{
        label: t('step-email.label'),
        name: 'email',
        type: 'text',
        required: true,
      }}
      schema={emailSchema}
    />,
    <StepFormFactory
      key={8}
      handleStep={handleStep}
      title={t('step-role.title')}
      description={t('step-role.description')}
      input={{
        label: t('step-role.label'),
        name: 'role',
        type: 'text',
        required: true,
      }}
      schema={roleSchema}
    />,
    <StepFormFactory
      key={8}
      handleStep={handleStep}
      title={t('step-twitter.title')}
      description={t('step-twitter.description')}
      input={{
        label: t('step-twitter.label'),
        name: 'twitter',
        type: 'text',
        required: true,
      }}
      schema={roleSchema}
    />,
    <StepFormTelegram key={10} handleStep={handleStep} />,
  ];

  const {
    currentComponent: currentStepComponent,
    changeStep,
    currentStep,
    isFirstStep,
    isLastStep,
  } = useMultistepForm(formComponents);

  const handleNext = () => {
    changeStep(currentStep + 1);
  };

  const handlePrevious = () => {
    changeStep(currentStep - 1);
  };

  return (
    <Stack
      sx={{
        backgroundImage: 'url(/images/signup-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        height: '100%',
      }}
    >
      <Stack
        sx={{
          position: 'absolute',
          top: { xs: 10, md: 38 },
          right: { xs: 20, md: 48 },
          zIndex: 1,
        }}
      >
        <Avatar>
          <IconButton
            onClick={() => {
              router.back();
            }}
          >
            <CloseIcon />
          </IconButton>
        </Avatar>
      </Stack>
      <Stack
        gap={2}
        sx={{
          maxWidth: { xs: '100%', md: '50%', lg: '582px' },
          width: '100%',
          backdropFilter: 'blur(25px)',
          px: { xs: 2, md: 6 },
          height: '100%',
          background: alpha(theme.palette.common.black, 0.03),
          borderRight: '1px solid rgba(229, 229, 229, 0.12)',
        }}
      >
        <Box
          component="a"
          href={ROUTES.EXPLORE}
          sx={{
            position: 'absolute',
            top: { xs: 20, md: 48 },
            left: { xs: 20, md: 48 },
          }}
        >
          <img
            src="/favicon-192.png"
            alt={t('logo-alternative-text')}
            width="30"
          />
        </Box>
        {orgCreated ? (
          <Loading />
        ) : (
          <Stack sx={{ mt: 18 }} gap={5}>
            <FormStepper
              currentStep={currentStep}
              qtdSteps={formComponents.length}
            />

            <Stack>
              {currentStepComponent}
              <Stack direction="row" justifyContent="space-between" gap={2}>
                {isFirstStep && (
                  <Button variant="contained" fullWidth onClick={handleNext}>
                    {t('step-create-profile.action')}
                  </Button>
                )}
                {!isFirstStep && (
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={handlePrevious}
                  >
                    Back
                  </Button>
                )}
                {!isLastStep && !isFirstStep && (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    size="large"
                    disabled={!stepValidity[`${currentStep}`]}
                  >
                    Next
                  </Button>
                )}
                {isLastStep && (
                  <Button variant="contained" fullWidth disabled={false}>
                    Enviar
                  </Button>
                )}
              </Stack>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
