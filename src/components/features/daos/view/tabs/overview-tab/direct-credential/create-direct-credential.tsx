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
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
  alpha,
  useTheme,
} from '@mui/material';

import { mutation } from '@/constants/queries';
import { useMultistepForm } from '@/hooks/use-multistep-form';
import { useAuth } from '@/providers/auth';
import VerticalStepper from './components/vertical-stepper';
import { setUpFormComponents } from './set-up-form-components';
import { LoadingButton } from '@/components/atoms/buttons/loading-button';
import {
  CreateGateData,
  createGateSchema,
} from '@/components/features/gates/create/schema';
import { ROUTES } from '@/constants/routes';
import {
  Create_Gate_Tasks_BasedMutationVariables,
  Create_Gate_DirectMutationVariables,
} from '@/services/hasura/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { useDaoProfile } from '../../../context';
import { ajvResolver } from '@hookform/resolvers/ajv';
import { fullFormats } from 'ajv-formats/dist/formats';
export type CreateGateSchema = z.infer<typeof createGateSchema>;

export function CreateDirectCredentialTemplate({
  closeDialog,
}: {
  closeDialog: () => void;
}) {
  const { dao } = useDaoProfile();
  const theme = useTheme();
  const windowSize = useWindowSize();
  const { t } = useTranslation('quest');
  const [fullFormState, setFullFormState] = useState(null);

  const handleStep = (newValue: boolean) => {
    setStepValidity((prev) => ({ ...prev, [currentStep]: newValue }));
  };

  const snackbar = useSnackbar();

  const formStepControl: {
    name: string;
  }[] = [
    { name: 'template' },
    { name: 'details' },
    { name: 'recipient' },
    { name: 'settings' },
  ];

  const formComponents = setUpFormComponents({
    fullFormState,
    handleStep: handleStep,
    updateFormState: setFullFormState,
    getValues: undefined,
  });

  const {
    currentComponent: currentStepComponent,
    changeStep,
    currentStep,
    isFirstStep,
    isLastStep,
    getInitialStateStepValidity,
  } = useMultistepForm(formComponents);
  const initialStepValidity = getInitialStateStepValidity(false);

  const [stepValidity, setStepValidity] = useState(initialStepValidity);

  const handleNext = () => {
    changeStep(currentStep + 1);
    router.push({
      hash: `create-direct-credential_${formStepControl[currentStep + 1].name}`,
    });
  };

  const handlePrevious = () => {
    changeStep(currentStep - 1);
    router.push({
      hash: `create-direct-credential${currentStep - 1 === 0 ? '' : '_'}${
        formStepControl[currentStep - 1].name
      }`,
    });
  };

  const router = useRouter();
  const { hasuraUserService, me } = useAuth();

  const [confirmPublish, setConfirmPublish] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [result, setResult] = useState(null);

  const [testing, setTesting] = useState(false);

  const methods = useForm<CreateGateSchema>({
    resolver: async (values, _, options) => {
      const { claim, ...rawData } = values;
      const zodResult = await zodResolver(createGateSchema)(
        { ...rawData, type: 'direct', creator: { id: '111' } },
        _,
        options as any
      );
      console.log(zodResult);
      const claimResult = await ajvResolver(values?.schema, {
        formats: fullFormats,
      })(claim, _, options as any);

      if (
        Object.keys({
          ...zodResult.errors,
          ...(Object.keys(claimResult.errors).length > 0 && {
            claim: claimResult.errors,
          }),
        }).length === 0 &&
        formStepControl[currentStep].name === 'details' &&
        testing === false
      ) {
        setTesting(true);
        handleNext();
      }
      return {
        values: {
          ...zodResult.values,
          claim: claimResult.values,
        },
        errors: {
          ...zodResult.errors,
          ...(Object.keys(claimResult.errors).length > 0 && {
            claim: claimResult.errors,
          }),
        },
      };
    },
  });

  const { enqueueSnackbar } = useSnackbar();

  const uploadImage = useMutation(
    ['uploadImage'],
    hasuraUserService.upload_image
  );

  const createGate = useMutation(
    ['createGate'],
    ({
      whitelisted_wallets_file,
      tasks,
      ...data
    }: Create_Gate_Tasks_BasedMutationVariables &
      Create_Gate_DirectMutationVariables) => {
      if (data.type === 'direct') {
        return hasuraUserService.create_gate_direct({
          ...data,
          whitelisted_wallets_file,
        });
      }
      return hasuraUserService.create_gate_tasks_based({ ...data, tasks });
    }
  );

  const publishGate = useMutation(
    ['publishGate'],
    hasuraUserService.publish_gate
  );

  const deleteTask = useMutation(
    ['deleteTask'],
    hasuraUserService.delete_tasks_by_pk
  );

  const closePublishedModal = () => setIsPublished(false);

  const checkFormErrors = async () => {
    const dataIsValid = await methods.trigger();

    if (!dataIsValid) {
      const errors = methods.formState.errors;

      if ((Object.values(errors)[0] as any).data?.message) {
        showErrorMessage((Object.values(errors)[0] as any).data?.message);
      }

      recursiveErrorMessage(errors);
    }

    return dataIsValid;
  };

  const showErrorMessage = (message: string) => {
    enqueueSnackbar(message, { variant: 'error', autoHideDuration: 8000 });
  };

  const taskErrorMessage = (data) => {
    data.forEach((taskData) => {
      recursiveErrorMessage(taskData);
      if (taskData?.task_data) {
        recursiveErrorMessage(taskData.task_data);
      }
    });
  };

  const recursiveErrorMessage = (obj) => {
    for (const prop in obj) {
      if (obj.hasOwnProperty.call(obj, prop)) {
        if (obj[prop]?.message) {
          showErrorMessage(obj[prop]?.message);
        } else if (obj[prop]?.length) {
          recursiveErrorMessage(obj[prop][0]);
        }
      }
    }
  };

  const takeErrorMessage = (obj): string | null => {
    let message = '';
    for (const task in obj) {
      if (obj.hasOwnProperty.call(obj, task)) {
        if (obj[task]?.message) {
          message = obj[task]?.message;
        } else if (obj[task].length) {
          message = takeErrorMessage(obj[task][0]);
        }
      }
    }
    return message !== '' ? message : null;
  };

  const handleMutation = async (data: any, isDraft: boolean) => {
    const dataIsValid = await checkFormErrors();

    if (!dataIsValid) {
      throw new Error();
    }

    const permissionsData = [{ user_id: me?.id, permission: 'gate_editor' }];
    let image_url = null;

    if (image_url !== data.image && data.image !== undefined) {
      const image_id = (
        await uploadImage.mutateAsync({
          base64: data.image,
          name: data.title,
        })
      )?.upload_image.id;
      image_url = `${process.env.NEXT_PUBLIC_NODE_ENDPOINT}/storage/file?id=${image_id}`;
    }
    if (data.title) {
      const response = await createGate.mutateAsync({
        id: uuidv4(),
        dao_id: dao.id,
        title: data.title,
        categories: data.categories || [],
        description: data.description,
        claim_limit: data.claim_limit,
        loyalty_id: data.loyalty_id ?? null,
        data_model_id: data.data_model_id ?? null,
        points: data.points ?? null,
        expire_date: data.expire_date,
        permissions: permissionsData,
        type: 'direct',
        image: image_url,
        tasks: data.tasks?.map(({ task_id, ...task }, index) => ({
          ...task,
          id: task_id,
          order: index,
        })),
        claim: data.claim,
        whitelisted_wallets_file: data.whitelisted_wallets_file?.id,
      });
      if (isDraft) {
        enqueueSnackbar('Draft saved');
        router.push(
          ROUTES.GATE_PROFILE.replace('[id]', response.insert_gates_one.id)
        );
        return;
      }
      enqueueSnackbar('Published');

      await publishGate.mutateAsync({
        gate_id: response.insert_gates_one.id,
      });
      router.push(
        ROUTES.GATE_PROFILE.replace('[id]', response.insert_gates_one.id)
      );
    }
  };

  // MAKE DB CALL
  const handleSaveAsDraft = async () => {
    try {
      await handleMutation(methods.watch(), true);
    } catch (e) {
      console.log(e);
      enqueueSnackbar("An error occured, couldn't save the draft.");
    }
    console.log(fullFormState, methods.watch());
  };

  const publish = async () => {
    try {
      await handleMutation(methods.watch(), false);
    } catch (e) {
      enqueueSnackbar("An error occured, couldn't save the draft.");
    }
    console.log(fullFormState, methods.getValues());
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
    <FormProvider {...methods}>
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
          lg={3.5}
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
        <Grid
          item
          xs={12}
          md={6}
          lg={12}
          px={{ xs: 0, lg: 8 }}
          sx={{
            flexGrow: 1,
            height: '100%',
            width: '100%',
            display: { md: 'flex' },
            flexDirection: 'column',
            overflowY: 'auto',
            overflowX: 'hidden',
            borderLeft: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Stack
            justifyContent="end"
            direction="row"
            flexGrow={0}
            sx={{
              px: { xs: 2, md: 6 },
              display: { md: 'flex' },
            }}
          >
            <Avatar sx={{ mt: 5 }}>
              <IconButton
                onClick={() => {
                  closeDialog();
                }}
              >
                <CloseIcon />
              </IconButton>
            </Avatar>
          </Stack>
          <Stack direction="column" sx={{ mt: -5 }}>
            {currentStepComponent}
            <Divider variant="fullWidth" sx={{ mx: '-6%' }} />
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              sx={{ my: 2, mx: { md: 6, xs: 2 } }}
              justifyContent={isFirstStep ? 'end' : 'space-between'}
              gap={2}
            >
              {!isFirstStep && (
                <Button variant="outlined" onClick={() => handlePrevious()}>
                  {t('create-quest.back')}
                </Button>
              )}
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                justifyContent={'end'}
                gap={2}
              >
                <LoadingButton
                  onClick={() => handleSaveAsDraft()}
                  variant="outlined"
                  size="large"
                  sx={{ marginLeft: 2 }}
                  isLoading={false}
                  disabled={
                    !(
                      formStepControl[currentStep].name === 'recipient' ||
                      formStepControl[currentStep].name === 'settings'
                    )
                  }
                >
                  {t('create-quest.save-as-draft')}
                </LoadingButton>

                {formStepControl[currentStep].name === 'details' && (
                  <LoadingButton
                    onClick={() => {
                      setTesting(false);
                      methods.trigger();
                    }}
                    variant="contained"
                    size="large"
                    sx={{ marginLeft: 2 }}
                    isLoading={false}
                    disabled={
                      !(formStepControl[currentStep].name === 'details')
                    }
                  >
                    {t('create-quest.continue')}
                  </LoadingButton>
                )}

                {!isLastStep &&
                  !(formStepControl[currentStep].name === 'details') && (
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      size="large"
                      sx={{ marginLeft: 2 }}
                      onClick={() => handleNext()}
                      disabled={!stepValidity[`${currentStep}`]}
                    >
                      {t('create-quest.continue')}
                    </LoadingButton>
                  )}
                {isLastStep && (
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{ marginLeft: 2 }}
                    onClick={() => publish()}
                    disabled={!stepValidity[`${currentStep}`]}
                  >
                    {t('create-quest.save-and-publish')}
                  </LoadingButton>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
