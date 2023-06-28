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
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import FormStepper from '@/components/molecules/form-stepper/form-stepper';
import RealTimeView, {
  StepNames,
} from '@/components/templates/org/signup/components/real-time-view';
import { localStorageKeys } from '@/constants/local-storage-keys';
import { mutation } from '@/constants/queries';
import { ROUTES } from '@/constants/routes';
import { useMultistepForm } from '@/hooks/use-multistep-form';
import { useAuth } from '@/providers/auth';
import VerticalStepper from './components/vertical-setpper';
import Footer from './components/footer';
import CredentialTemplate from './components/credential-template';
import { setUpFormComponents } from './set-up-form-components';

export function CreateQuestTemplate({
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

  const formStepControl: {
    name: String;
    preview: boolean;
    saveAsDraft: boolean;
  }[] = [
    { name: 'template', preview: false, saveAsDraft: false },
    { name: 'details', preview: false, saveAsDraft: false },
    { name: 'tasks', preview: true, saveAsDraft: false },
    { name: 'settings', preview: true, saveAsDraft: false },
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
  console.log(fullFormState,handleStep)
  const initialStepValidity = getInitialStateStepValidity(false);

  const [stepValidity, setStepValidity] = useState(initialStepValidity);

  const handleNext = () => {
    changeStep(currentStep + 1);
    router.push({
      hash: `create-quest_${formStepControl[currentStep + 1].name}`,
    });
  };

  const handlePrevious = () => {
    changeStep(currentStep - 1);
    router.push({
      hash: `create-quest${currentStep - 1 === 0 ? '' : '_'}${
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
        }}
      >
        <Grid
          item
          xs={10}
          md={6}
          lg={3}
          sx={{
            pt: { xs: 3, md: 6 },
            pb: { xs: 3, md: 0 },
            px: { xs: 2, md: 6 },
            flexGrow: 0,
            background: alpha(theme.palette.common.black, 0.03),
            backdropFilter: { xs: 'blur(85px)', md: 'blur(25px)' },
            height: '100%',
            display: { xs: 'none', md: 'flex' },
          }}
        >
          <Stack gap={5}>
            <Stack>
              <Stack direction="row" justifyContent="space-between" gap={2}>
                <VerticalStepper activeStep={currentStep} />
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
            display: { md: 'flex' },
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
          <Stack direction="column" sx={{}}>
            {currentStepComponent}
            <Footer fullFormState={fullFormState} handleNext={handleNext} />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
