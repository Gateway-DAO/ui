import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useLocalStorage, useWindowSize } from 'react-use';

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

import { localStorageKeys } from '../../../../constants/local-storage-keys';
import { ROUTES } from '../../../../constants/routes';
import { useMultistepForm } from '../../../../hooks/use-multistep-form';
import Loading from '../../../atoms/loading';
import FormStepper from '../../../molecules/form-stepper/form-stepper';
import RealTimeView, { StepNames } from './components/real-time-view';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const windowSize = useWindowSize();
  const { t } = useTranslation('org-signup');
  const [orgCreated, setOrgCreated] = useState(false);
  const router = useRouter();
  const [formValue] = useLocalStorage(localStorageKeys.org_signup, null);
  const [fullFormState, setFullFormState] = useState(null);

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

  const formStepNames: StepNames[] = [
    '',
    'name',
    'gatewayId',
    'categories',
    'about',
    'email',
    'role',
    'twitter',
    'telegram',
  ];

  const formComponents = [
    <StepCreateProfile key={1} />,
    <StepFormFactory
      updateFormState={setFullFormState}
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
      updateFormState={setFullFormState}
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
      updateFormState={setFullFormState}
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
      updateFormState={setFullFormState}
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
      updateFormState={setFullFormState}
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
      updateFormState={setFullFormState}
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
      updateFormState={setFullFormState}
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
      updateFormState={setFullFormState}
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
    router.push({ hash: formStepNames[currentStep + 1] });
  };

  const handlePrevious = () => {
    changeStep(currentStep - 1);
    router.push({ hash: formStepNames[currentStep - 1] });
  };

  return (
    <Grid
      container
      height={isMobile ? 'auto' : `100%`}
      sx={{
        flexWrap: 'nowrap',
        flexDirection: { xs: 'column', md: 'row' },
        minHeight: `${windowSize.height}px`,
        backgroundColor: brandColors.background.dark,
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
          sx={{ mb: { xs: 4, md: 9 } }}
        >
          <Box component="a" href={ROUTES.EXPLORE}>
            <img
              src="/favicon-192.png"
              alt={t('logo-alternative-text')}
              width="30"
            />
          </Box>

          <Avatar sx={{ display: { md: 'none' } }}>
            <IconButton
              onClick={() => {
                router.back();
              }}
            >
              <CloseIcon />
            </IconButton>
          </Avatar>
        </Stack>
        {orgCreated ? (
          <Loading />
        ) : (
          <Stack gap={5}>
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
                router.back();
              }}
            >
              <CloseIcon />
            </IconButton>
          </Avatar>
        </Stack>
        {!isFirstStep && (
          <RealTimeView
            step={formStepNames[currentStep]}
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
