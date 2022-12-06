import { useRouter } from 'next/router';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useForm, FormProvider } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { Box, Divider, Stack, Typography } from '@mui/material';

import { ROUTES } from '../../../constants/routes';
import { useAuth } from '../../../providers/auth';
import {
  Create_Gate_DirectMutationVariables,
  Create_Gate_Tasks_BasedMutationVariables,
} from '../../../services/graphql/types.generated';
import ConfirmDialog from '../../organisms/confirm-dialog/confirm-dialog';
import GatePublishedModal from '../../organisms/gates/create/gate-published';
import { PublishNavbar } from '../../organisms/publish-navbar/publish-navbar';
import TaskArea from '../../organisms/tasks-area/tasks-area';
import { AdvancedSetting } from './advanced-settings';
import { GateDetailsForm } from './details-form';
import { GateImageCard } from './gate-image-card/gate-image-card';
import { GateTypeChanger } from './gate-type-selector/gate-type-changer';
import { GateTypeSelector } from './gate-type-selector/gate-type-selector';
import { createGateSchema, CreateGateData } from './schema';
import { DirectWallets } from './tasks/direct/direct-wallets';

type CreateGateProps = {
  oldData?: CreateGateData;
};

// TODO: Delete unused tasks when changing gate type or when editing a gate
// Delete all tasks and create the new ones.

export function CreateGateTemplate({ oldData }: CreateGateProps) {
  const methods = useForm({
    resolver: zodResolver(createGateSchema),
    mode: 'onBlur',
    defaultValues: {
      ...oldData,
    },
  });

  const router = useRouter();
  const { gqlAuthMethods } = useAuth();

  const [confirmPublish, setConfirmPublish] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [result, setResult] = useState(null);

  const [deletedTasks, setDeletedTasks] = useState<string[]>([]);

  const { enqueueSnackbar } = useSnackbar();

  const uploadImage = useMutation(['uploadImage'], gqlAuthMethods.upload_image);

  const createGate = useMutation(
    ['createGate'],
    ({
      whitelisted_wallets_file,
      tasks,
      ...data
    }: Create_Gate_Tasks_BasedMutationVariables &
      Create_Gate_DirectMutationVariables) => {
      if (data.type === 'direct') {
        return gqlAuthMethods.create_gate_direct({
          ...data,
          whitelisted_wallets_file,
        });
      }
      return gqlAuthMethods.create_gate_tasks_based({ ...data, tasks });
    }
  );

  const publishGate = useMutation(['publishGate'], gqlAuthMethods.publish_gate);

  const deleteTask = useMutation(
    ['deleteTask'],
    gqlAuthMethods.delete_tasks_by_pk
  );

  const closePublishedModal = () => setIsPublished(false);

  const checkFormErrors = async () => {
    const dataIsValid = await methods.trigger();

    if (!dataIsValid) {
      const errors = methods.formState.errors;

      // Tasks errors
      if (errors?.tasks?.length) {
        taskErrorMessage(errors?.tasks);
      }

      if (Object.values(errors)[0].data?.message) {
        showErrorMessage(Object.values(errors)[0].data?.message);
      }

      recursiveErrorMessage(errors);
    }

    return dataIsValid;
  };

  const handleMutation = async (data: CreateGateData, isDraft: boolean) => {
    const dataIsValid = await checkFormErrors();

    if (!dataIsValid) return;

    const permissionsData = [
      { user_id: data.creator.id, permission: 'gate_editor' },
    ];
    let image_url = oldData.image || null;

    if (image_url !== data.image && data.image !== undefined) {
      const image_id = (
        await uploadImage.mutateAsync({
          base64: data.image,
          name: data.title,
        })
      )?.upload_image.id;
      image_url = `${process.env.NEXT_PUBLIC_NODE_ENDPOINT}/storage/file?id=${image_id}`;
    }
    if (deletedTasks.length > 0) {
      await Promise.all(
        deletedTasks
          .filter((task) => !!task)
          .map((task_id) =>
            deleteTask.mutateAsync({
              task_id,
            })
          )
      );
    }
    if (data.title) {
      const response = await createGate.mutateAsync({
        id: oldData.id || uuidv4(),
        dao_id: router.query.dao as string,
        title: data.title,
        categories: data.categories || [],
        description: data.description,
        skills: data.skills || [],
        claim_limit: data.claim_limit,
        expire_date: data.expire_date,
        permissions: permissionsData,
        type: data.type,
        image: image_url,
        tasks: data.tasks?.map(({ task_id, ...task }, index) => ({
          ...task,
          id: task_id,
          order: index,
        })),
        whitelisted_wallets_file: data.whitelisted_wallets_file?.id,
      });
      if (isDraft) {
        enqueueSnackbar('Draft saved');
        router.push(
          ROUTES.GATE_PROFILE.replace('[id]', response.insert_gates_one.id)
        );
        return;
      }
      await publishGate.mutateAsync({
        gate_id: response.insert_gates_one.id,
      });
      setResult(response.insert_gates_one);
      setIsPublished(true);
    }
  };

  const showErrorMessage = (message: string) => {
    enqueueSnackbar(message, { variant: 'error', autoHideDuration: 8000 });
  };

  const taskErrorMessage = (data) => {
    data.forEach((taskData, i) => {
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

  const onSaveDraft = async (draftData: CreateGateData) => {
    try {
      await handleMutation(draftData, true);
    } catch (e) {
      enqueueSnackbar("An error occured, couldn't save the draft.");
    }
  };

  const onCreateGate = async (gateData: CreateGateData) => {
    try {
      await handleMutation(gateData, false);
    } catch (e) {
      enqueueSnackbar("An error occured, couldn't save the draft.");
    }
  };

  const gateType = methods.watch('type');
  const hasTitleAndDescription = methods
    .watch(['title', 'description'])
    .every((value) => !!value);

  return (
    <>
      <FormProvider {...methods}>
        <Stack
          component="form"
          id="gate-details-form"
          onSubmit={async (e) => {
            e.preventDefault();

            const dataIsValid = await checkFormErrors();

            if (dataIsValid) {
              setConfirmPublish(true);
            }
          }}
          sx={(theme) => ({
            p: '0 90px',
            pb: 12,
            [theme.breakpoints.down('sm')]: { px: 2.5, pb: 6 },
          })}
        >
          <PublishNavbar
            isLoading={
              createGate.isLoading ||
              publishGate.isLoading ||
              deleteTask.isLoading
            }
            saveDraft={onSaveDraft}
          />
          <Box
            padding={'0 90px'}
            sx={(theme) => ({
              p: '0 90px',
              [theme.breakpoints.down('sm')]: { p: '0 20px' },
            })}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{ margin: '40px 0 40px 0', marginBottom: { md: '100px' } }}
            >
              {oldData.id ? 'Edit' : 'Create'} Credential
            </Typography>

            {/* Details */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="stretch"
              gap={2}
              sx={{
                width: '100%',
                flexDirection: { xs: 'column', md: 'row' },
              }}
            >
              <Box>
                <Typography component="h2" variant="h5" gutterBottom>
                  Add details
                </Typography>
                <Typography variant="body2" color={'text.secondary'}>
                  Add the details of the credential
                </Typography>
              </Box>
              <Stack
                gap={7.5}
                mt={2}
                sx={{
                  maxWidth: { xs: '100%', md: '50%', lg: '40%' },
                  width: '100%',
                }}
              >
                <Stack direction="column" gap={4}>
                  <GateDetailsForm />
                  <AdvancedSetting />
                </Stack>
              </Stack>

              <GateImageCard
                draftImage={oldData.image}
                label={
                  <>
                    <Typography textAlign={'center'} paddingX={4}>
                      Drop or{' '}
                      <Typography color={'primary'} display={'inline'}>
                        upload
                      </Typography>{' '}
                      your credential image
                    </Typography>
                  </>
                }
                sx={{
                  width: 300,
                }}
              />
            </Stack>
          </Box>

          {/* Tasks */}
          {hasTitleAndDescription && (
            <>
              <Divider sx={{ my: 5 }} />
              <Box
                sx={(theme) => ({
                  display: 'flex',
                  width: '100%',
                  p: '0 90px',
                  flexDirection: { xs: 'column', md: 'row' },
                  justifyContent: 'space-between',
                  [theme.breakpoints.down('sm')]: { p: '0 20px' },
                })}
              >
                <Box
                  sx={{
                    maxWidth: {
                      md: `18%`,
                    },
                  }}
                >
                  <Typography component="h2" variant="h5" gutterBottom>
                    Define how to obtain
                  </Typography>
                  <Typography
                    variant="body2"
                    color={'text.secondary'}
                    marginBottom={4}
                  >
                    Set what is necessary to do to obtain this credential
                  </Typography>
                </Box>
                <Stack
                  direction="column"
                  sx={{
                    marginLeft: 'auto',
                    width: '100%',
                    maxWidth: { xs: '100%', md: '100%', lg: '80%' },
                  }}
                  gap={4}
                >
                  {gateType ? (
                    <GateTypeChanger type={gateType} />
                  ) : (
                    <GateTypeSelector />
                  )}
                  {gateType === 'direct' && <DirectWallets />}
                  {gateType === 'task_based' && (
                    <Stack direction="column" gap={2}>
                      <TaskArea
                        draftTasks={oldData.tasks ?? []}
                        onDelete={setDeletedTasks}
                      />
                    </Stack>
                  )}
                </Stack>
              </Box>
            </>
          )}

          <ConfirmDialog
            title="Are you sure you want to publish this credential?"
            open={confirmPublish}
            positiveAnswer="Publish"
            negativeAnswer="Cancel"
            setOpen={setConfirmPublish}
            onConfirm={methods.handleSubmit(onCreateGate, (errors) => {
              enqueueSnackbar(
                Object.values(errors)[0]?.data?.message || 'Invalid data'
              );
            })}
          >
            If you publish this credential, you will no longer be allowed to
            edit it. You can unpublish or delete the credential any time.
          </ConfirmDialog>
          <GatePublishedModal
            open={isPublished}
            handleClose={closePublishedModal}
            gate={result}
          />
        </Stack>
      </FormProvider>
    </>
  );
}
