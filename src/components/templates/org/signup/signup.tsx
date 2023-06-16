import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Loading from '@/components/atoms/loadings/loading';
import { brandColors } from '@/theme';
import { useSnackbar } from 'notistack';
import { useLocalStorage, useWindowSize } from 'react-use';
import { useMutation } from 'wagmi';

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
  useTheme,
} from '@mui/material';

import { localStorageKeys } from '../../../../constants/local-storage-keys';
import { mutation } from '../../../../constants/queries';
import { ROUTES } from '../../../../constants/routes';
import { useMultistepForm } from '../../../../hooks/use-multistep-form';
import { useAuth } from '../../../../providers/auth';
import FormStepper from '../../../molecules/form-stepper/form-stepper';
import RealTimeView, { StepNames } from './components/real-time-view';
import { setUpFormComponents } from './components/set-up-form-components';

export function OrgSignUpTemplate({
  closeDialog,
}: {
  closeDialog: () => void;
}) {
  const theme = useTheme();
  const windowSize = useWindowSize();
  const { t } = useTranslation('org-signup');
  const router = useRouter();
  const [fullFormState, setFullFormState] = useState(null);
  const { hasuraUserService } = useAuth();

  const handleStep = (newValue: boolean) => {
    setStepValidity((prev) => ({ ...prev, [currentStep]: newValue }));
  };

  const snackbar = useSnackbar();

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
    { name: 'success', backgroundImage: false },
  ];

  const [_, updateFormValueStorage] = useLocalStorage(
    localStorageKeys.org_signup,
    null
  );

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
    router.push({
      hash: `org-signup_${formStepControl[currentStep + 1].name}`,
    });
  };

  const handlePrevious = () => {
    changeStep(currentStep - 1);
    router.push({
      hash: `org-signup${currentStep - 1 === 0 ? '' : '_'}${
        formStepControl[currentStep - 1].name
      }`,
    });
  };

  const handleSubmit = async () => {
    await createOrganization.mutate();
  };

  const createOrganization = useMutation(
    [mutation.create_organization],
    () =>
      hasuraUserService.create_organization({
        ...fullFormState,
      }),
    {
      onSuccess: (data) => {
        setFullFormState({
          slug: data.insert_daos_one.slug,
        });
        handleNext();
        updateFormValueStorage(null);
      },
      onError: (e: any) => {
        snackbar.enqueueSnackbar(e?.response?.errors?.[0]?.message, {
          variant: 'error',
        });
      },
    }
  );

  return (
    <>
      {createOrganization.isLoading && <Loading fullScreen />}
      <Grid
        container
        sx={{
          height: { xs: 'auto', md: '100%' },
          flexWrap: 'nowrap',
          flexDirection: { xs: 'column', md: 'row' },
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          minHeight: `${windowSize.height}px`,
          backgroundColor: brandColors.background.main,
          backgroundImage: {
            xs: 'url(/images/signup-background.png)',
            md: formStepControl[currentStep].backgroundImage
              ? 'url(/images/signup-background.png)'
              : 'none',
          },
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
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleNext}
                    sx={{ height: 48 }}
                  >
                    {t('step-create-profile.action')}
                  </Button>
                )}
                {/* [ ] Use translation */}
                {!isFirstStep && !isLastStep && (
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={handlePrevious}
                    sx={{ height: 48 }}
                  >
                    {t('action-back')}
                  </Button>
                )}

                {!isLastStep &&
                  !isFirstStep &&
                  formStepControl[currentStep].name !== 'telegram' && (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      size="large"
                      sx={{ height: 48 }}
                      disabled={!stepValidity[`${currentStep}`]}
                    >
                      {t('action-next')}
                    </Button>
                  )}
                {formStepControl[currentStep].name === 'telegram' && (
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleSubmit}
                    sx={{ height: 48 }}
                  >
                    {fullFormState?.telegram?.length > 0
                      ? 'Finish'
                      : 'Skip and finish'}
                  </Button>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Grid>
        {/* [ ] Create more components */}
        <Divider
          orientation="vertical"
          sx={{ display: { xs: 'none', md: 'flex' } }}
          flexItem
        />
        <Grid
          item
          xs={12}
          md={6}
          lg={8}
          sx={{
            pt: { xs: 3, md: 6 },
            flexGrow: 1,
            height: '100%',
            display: { xs: 'none', md: 'flex' },
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
          {!formStepControl[currentStep].backgroundImage &&
            formStepControl[currentStep].name !== 'success' && (
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
    </>
  );
}
