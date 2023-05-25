import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useWindowSize } from 'react-use';

import { brandColors } from '@gateway/theme';

import CloseIcon from '@mui/icons-material/Close';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
  alpha,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { ROUTES } from '../../../../constants/routes';
import { useMultistepForm } from '../../../../hooks/use-multistep-form';
import FormStepper from '../../../molecules/form-stepper/form-stepper';
import RealTimeView, { StepNames } from './components/real-time-view';
import { setUpFormComponents } from './components/set-up-form-components';

export function OrgSignUpTemplate({
  closeDialog,
}: {
  closeDialog: () => void;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const windowSize = useWindowSize();
  const { t } = useTranslation('org-signup');
  const router = useRouter();
  const [fullFormState, setFullFormState] = useState(null);

  const handleStep = (newValue: boolean) => {
    setStepValidity((prev) => ({ ...prev, [currentStep]: newValue }));
  };

  const formStepControl: { name: StepNames; backgroundImage: boolean }[] = [
    { name: '', backgroundImage: true },
    { name: 'name', backgroundImage: false },
    { name: 'gatewayId', backgroundImage: false },
    { name: 'categories', backgroundImage: false },
    { name: 'about', backgroundImage: false },
    { name: 'website', backgroundImage: true },
    { name: 'email', backgroundImage: true },
    { name: 'role', backgroundImage: true },
    { name: 'twitter', backgroundImage: true },
    { name: 'telegram', backgroundImage: true },
    { name: 'success', backgroundImage: true },
  ];

  const formComponents = setUpFormComponents({
    fullFormState,
    handleStep: handleStep,
    updateFormState: setFullFormState,
  });

  const {
    currentComponent: currentStepComponent,
    changeStep,
    currentStep,
    isFirstStep,
    isLastStep,
    getInitialStateStepValidity,
  } = useMultistepForm(formComponents);

  const initialStepValidity = getInitialStateStepValidity(true);

  const [stepValidity, setStepValidity] = useState(initialStepValidity);

  const handleNext = () => {
    changeStep(currentStep + 1);
    router.push({ hash: formStepControl[currentStep + 1].name });
  };

  const handlePrevious = () => {
    changeStep(currentStep - 1);
    router.push({ hash: formStepControl[currentStep - 1].name });
  };

  const handleSubmit = () => {
    handleNext();
  };

  return (
    <Grid
      container
      height={isMobile ? 'auto' : `100%`}
      sx={{
        flexWrap: 'nowrap',
        flexDirection: { xs: 'column', md: 'row' },
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        minHeight: `${windowSize.height}px`,
        backgroundColor: brandColors.background.dark,
        backgroundImage: formStepControl[currentStep].backgroundImage
          ? 'url(/images/signup-background.png)'
          : 'none',
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
        lg={4}
        sx={{
          pt: { xs: 3, md: 6 },
          pb: { xs: 3, md: 0 },
          px: { xs: 2, md: 6 },
          flexGrow: 0,
          background: alpha(theme.palette.common.black, 0.03),
          backdropFilter: 'blur(25px)',
          height: '100%',
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ mb: { xs: isLastStep ? 0 : 4, md: isLastStep ? 0 : 9 } }}
        >
          {!isLastStep && (
            <Box component="a" href={ROUTES.EXPLORE}>
              <img
                src="/favicon-192.png"
                alt={t('logo-alternative-text')}
                width="30"
              />
            </Box>
          )}

          <Avatar sx={{ display: { md: 'none' } }}>
            <IconButton
              onClick={() => {
                closeDialog();
              }}
            >
              <CloseIcon />
            </IconButton>
          </Avatar>
        </Stack>
        <Stack gap={5}>
          {!isLastStep && (
            <FormStepper
              currentStep={currentStep}
              qtdSteps={formComponents.length}
            />
          )}

          <Stack>
            {currentStepComponent}
            <Stack direction="row" justifyContent="space-between" gap={2}>
              {isFirstStep && (
                <Button variant="contained" fullWidth onClick={handleNext}>
                  {t('step-create-profile.action')}
                </Button>
              )}
              {!isFirstStep && !isLastStep && (
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handlePrevious}
                >
                  Back
                </Button>
              )}
              {!isLastStep &&
                !isFirstStep &&
                formStepControl[currentStep].name !== 'telegram' && (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    size="large"
                    disabled={!stepValidity[`${currentStep}`]}
                  >
                    Next
                  </Button>
                )}
              {formStepControl[currentStep].name === 'telegram' && (
                <Button variant="contained" size="large" onClick={handleSubmit}>
                  {fullFormState?.telegram?.length > 0
                    ? 'Finish'
                    : 'Skip and finish'}
                </Button>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Grid>
      <Divider orientation={isMobile ? 'horizontal' : 'vertical'} flexItem />
      <Grid
        item
        xs={12}
        md={6}
        lg={8}
        sx={{
          pt: { xs: 3, md: 6 },
          flexGrow: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Stack
          justifyContent="end"
          direction="row"
          flexGrow={0}
          sx={{
            mb: 6,
            px: { xs: 2, md: 6 },
            display: { xs: 'none', md: 'flex' },
          }}
        >
          <Avatar>
            <IconButton
              onClick={() => {
                closeDialog();
              }}
            >
              <CloseIcon />
            </IconButton>
          </Avatar>
        </Stack>
        {!formStepControl[currentStep].backgroundImage && (
          <RealTimeView
            step={formStepControl[currentStep].name}
            name={fullFormState?.name}
            gatewayId={fullFormState?.gatewayId}
            categories={fullFormState?.categories}
            about={fullFormState?.about}
          />
        )}
      </Grid>
    </Grid>
  );
}
