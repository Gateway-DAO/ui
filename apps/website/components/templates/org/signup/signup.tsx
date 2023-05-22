import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { SchemaOf, object, string } from 'yup';

import { theme } from '@gateway/theme';

import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Box, Button, IconButton, Stack, alpha } from '@mui/material';

import { ROUTES } from '../../../../constants/routes';
import { useMultistepForm } from '../../../../hooks/use-multistep-form';
import Loading from '../../../atoms/loading';
import FormStepper from '../../../molecules/form-stepper/form-stepper';
import StepCreateProfile from './components/step-create-profile';

export function OrgSignUpTemplate() {
  const { t } = useTranslation('org-signup');
  const [orgCreated, setOrgCreated] = useState(false);
  const router = useRouter();
  const methods = useForm();
  //   const methods = useForm<NewOrgSchema>({
  //     resolver: yupResolver(schemaOrgSignUp),
  //     mode: 'all',
  //   });
  const { handleSubmit, watch, formState } = methods;

  const [stepValidity, setStepValidity] = useState({
    0: true,
    1: false,
  });
  const formComponents = [<StepCreateProfile key={1} />];
  const {
    currentComponent: currentStepComponent,
    changeStep,
    currentStep,
    isFirstStep,
    isLastStep,
  } = useMultistepForm(formComponents);

  const onSubmit = (data) => {
    console.log(data);
  };

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
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
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
                      disabled={!stepValidity[`${currentStep}`]}
                    >
                      Next
                    </button>
                  )}
                  {isLastStep && (
                    <button type="submit" disabled={!formState.isValid}>
                      Enviar
                    </button>
                  )}
                </Stack>
              </form>
            </FormProvider>
          </>
        )}
      </Stack>
    </Stack>
  );
}
