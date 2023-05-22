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
import StepFormAbout from './components/step-form-about';
import StepFormCategories from './components/step-form-categories';
import StepFormEmail from './components/step-form-email';
import StepFormGatewayId from './components/step-form-gateway-id';
import StepFormName from './components/step-form-name';
import StepFormRole from './components/step-form-role';
import StepFormTelegram from './components/step-form-telegram';
import StepFormTwitter from './components/step-form-twitter';
import StepFormWebsite from './components/step-form-website';

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
  });
  const formComponents = [
    <StepCreateProfile key={1} />,
    <StepFormName key={2} handleStep={handleStep} />,
    <StepFormGatewayId key={3} handleStep={handleStep} />,
    <StepFormCategories key={4} handleStep={handleStep} />,
    <StepFormAbout key={5} handleStep={handleStep} />,
    <StepFormWebsite key={6} handleStep={handleStep} />,
    <StepFormEmail key={7} handleStep={handleStep} />,
    <StepFormRole key={8} handleStep={handleStep} />,
    <StepFormTwitter key={9} handleStep={handleStep} />,
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
          justifyContent: 'center',
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
          <>
            <FormStepper
              currentStep={currentStep}
              qtdSteps={formComponents.length}
            />

            <Stack>
              {currentStepComponent}
              <Stack>
                {isFirstStep && (
                  <Button variant="contained" fullWidth onClick={handleNext}>
                    {t('step-create-profile.action')}
                  </Button>
                )}
                {!isFirstStep && (
                  <button type="button" onClick={handlePrevious}>
                    Back
                  </button>
                )}
                {!isLastStep && !isFirstStep && (
                  <button
                    type="button"
                    onClick={handleNext}
                    // disabled={!stepValidity[`${currentStep}`]}
                  >
                    Next
                  </button>
                )}
                {isLastStep && (
                  <button type="submit" disabled={false}>
                    Enviar
                  </button>
                )}
              </Stack>
            </Stack>
          </>
        )}
      </Stack>
    </Stack>
  );
}
