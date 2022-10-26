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
  Tasks_Constraint,
  Tasks_Update_Column,
  Permissions_Constraint,
  Permissions_Update_Column,
} from '../../../services/graphql/types.generated';
import ConfirmDialog from '../../organisms/confirm-dialog/confirm-dialog';
import GatePublishedModal from '../../organisms/gates/create/gate-published';
import { PublishNavbar } from '../../organisms/publish-navbar/publish-navbar';
import TaskArea from '../../organisms/tasks-area/tasks-area';
import { GateDetailsForm } from './details-form';
import { GateImageCard } from './gate-image-card/gate-image-card';
import { GateTypeSelector } from './gate-type-selector';
import {
  createGateSchema,
  CreateGateTypes,
  DraftGateTypes,
  GateType,
} from './schema';

type CreateGateProps = {
  oldData?: DraftGateTypes;
};

export function CreateGateTemplate({ oldData }: CreateGateProps) {
  const gateDetails = (({
    title,
    categories,
    description,
    skills,
    created_by,
    type,
  }) => ({ title, categories, description, skills, created_by, type }))(
    oldData
  );

  const methods = useForm({
    resolver: zodResolver(createGateSchema),
    mode: 'onBlur',
  });

  const router = useRouter();
  const { gqlAuthMethods } = useAuth();

  const [gateId, setGateId] = useState(oldData.id || '');
  const [confirmPublish, setConfirmPublish] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [draftIsLoading, setDraftIsLoading] = useState(false);
  const [createIsLoading, setCreateIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const [deletedTasks, setDeletedTasks] = useState<string[]>([]);

  const { enqueueSnackbar } = useSnackbar();

  const { mutateAsync: uploadImage } = useMutation(
    ['uploadImage'],
    gqlAuthMethods.upload_image
  );

  const { mutateAsync: createGateMutation } = useMutation(
    ['createGate'],
    gqlAuthMethods.create_gate
  );

  const { mutate: publishGate } = useMutation(
    ['publishGate'],
    gqlAuthMethods.publish_gate
  );

  const { mutateAsync: deleteTaskMutation } = useMutation(
    ['deleteTask'],
    gqlAuthMethods.delete_tasks_by_pk
  );

  const closePublishedModal = () => setIsPublished(false);

  const checkFormErrors = async (isDraft) => {
    const dataIsValid = await methods.trigger();

    if (!dataIsValid) {
      const errors = methods.formState.errors;
      enqueueSnackbar(
        Object.values(errors)[0].data?.message ||
          taskErrorMessage(errors?.tasks?.data) ||
          'Invalid data',
        {
          variant: 'error',
        }
      );
      isDraft ? setDraftIsLoading(false) : setCreateIsLoading(false);
    }

    return dataIsValid;
  };

  const handleMutation = async (data: CreateGateTypes, isDraft: boolean) => {
    isDraft ? setDraftIsLoading(true) : setCreateIsLoading(true);

    const dataIsValid = await checkFormErrors(isDraft);
    if (!dataIsValid) return;

    let permissionsData = null;
    let image_url = oldData.image || null;
    if (data.created_by.length > 0) {
      permissionsData = {
        data: data.created_by.map((creator) => {
          return { user_id: creator.id, permission: 'gate_editor' };
        }),
      };
    }
    if (image_url !== data.image && data.image !== undefined) {
      await uploadImage(
        {
          base64: data.image,
          name: data.title,
        },
        {
          onSuccess(imageData) {
            const image_id = imageData['upload_image'].id;
            image_url =
              process.env.NEXT_PUBLIC_NODE_ENDPOINT +
              '/storage/file?id=' +
              image_id;
          },
          onError() {
            enqueueSnackbar("An error occured, couldn't upload the image.", {
              variant: 'error',
            });
          },
        }
      );
    }
    if (deletedTasks.length > 0) {
      deletedTasks.forEach(async (task_id) => {
        await deleteTaskMutation({
          task_id,
        });
      });
    }
    if (data.title) {
      await createGateMutation(
        {
          id: oldData.id || uuidv4(),
          dao_id: router.query.dao,
          title: data.title,
          categories: data.categories || [],
          description: data.description,
          skills: data.skills || [],
          permissions: {
            ...permissionsData,
            on_conflict: {
              constraint:
                Permissions_Constraint.PermissionsDaoIdUserIdCredentialIdKey,
              update_columns: [Permissions_Update_Column.Permission],
            },
          },
          image: image_url,
          tasks: {
            data: data.tasks.data.map((task, index) => {
              const { task_id, ...cleanTask } = task;
              return {
                ...cleanTask,
                id: task_id,
                order: index,
              };
            }),
            on_conflict: {
              constraint: Tasks_Constraint.KeysPk,
              update_columns: [
                Tasks_Update_Column.Title,
                Tasks_Update_Column.Description,
                Tasks_Update_Column.TaskData,
                Tasks_Update_Column.TaskType,
                Tasks_Update_Column.Order,
              ],
            },
          },
          published: 'not_published',
        },
        {
          async onSuccess(result) {
            if (isDraft) {
              enqueueSnackbar('Draft saved');
              setDraftIsLoading(false);
              router.push(
                ROUTES.GATE_PROFILE.replace('[id]', result.insert_gates_one.id)
              );
            } else {
              await publishGate({
                gate_id: result.insert_gates_one.id,
              });
              setGateId(result.insert_gates_one.id);
              setResult(result.insert_gates_one);
              setIsPublished(true);
            }
          },
          onError() {
            isDraft ? setDraftIsLoading(false) : setCreateIsLoading(false);
            enqueueSnackbar(
              isDraft
                ? "An error occured, couldn't save the draft."
                : "An error occured, couldn't create the gate."
            );
          },
        }
      );
    }
    isDraft ? setDraftIsLoading(false) : setCreateIsLoading(false);
  };

  const taskErrorMessage = (data): string | null => {
    return data?.length && data[0].task_data
      ? takeErrorMessage(data[0].task_data)
      : null;
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

  const gateType: GateType = methods.watch('type');
  console.log(gateType);

  const saveDraft = (draftData: CreateGateTypes) =>
    handleMutation(draftData, true);

  const createGate = (gateData: CreateGateTypes) =>
    handleMutation(gateData, false);

  const hasTitleAndDescription = methods
    .watch(['title', 'description'])
    .every((value) => !!value);

  const canShowTasks =
    hasTitleAndDescription || (gateDetails.title && gateDetails.description);

  return (
    <>
      <FormProvider {...methods}>
        <Stack
          component="form"
          id="gate-details-form"
          onSubmit={async (e) => {
            e.preventDefault();

            const dataIsValid = await checkFormErrors(false);

            if (dataIsValid) {
              setConfirmPublish(true);
            }
          }}
          padding={'0 90px'}
          sx={(theme) => ({
            p: '0 90px',
            [theme.breakpoints.down('sm')]: { p: '0 20px' },
          })}
        >
          <PublishNavbar
            draftIsLoading={draftIsLoading}
            createIsLoading={createIsLoading}
            saveDraft={saveDraft}
          />
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
                <GateDetailsForm gateData={gateDetails} />
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

          {/* Tasks */}
          {canShowTasks && (
            <>
              <GateTypeSelector />
              <Divider sx={{ margin: '60px 0', width: '100%' }} />
              {gateType === 'task_based' && (
                <Stack
                  direction="row"
                  gap={{ lg: 5, xs: 2, md: 2 }}
                  sx={(theme) => ({
                    width: '100%',
                    display: { xs: 'block', md: 'flex' },
                    [theme.breakpoints.down('sm')]: { p: '0 20px' },
                  })}
                >
                  <Box
                    sx={{
                      maxWidth: {
                        lg: `15%`,
                      },
                    }}
                  >
                    <Typography component="h2" variant="h5" gutterBottom>
                      Set requirements
                    </Typography>
                    <Typography
                      variant="body2"
                      color={'text.secondary'}
                      marginBottom={4}
                    >
                      Define the requirements that the user must meet to obtain
                      the credential
                    </Typography>
                  </Box>
                  <Stack
                    direction="column"
                    sx={{
                      margin: 'auto',
                      width: '100%',
                      maxWidth: { xs: '100%', md: '100%', lg: '80%' },
                    }}
                  >
                    <Stack direction="column" gap={2}>
                      <TaskArea
                        draftTasks={oldData.tasks || []}
                        onDelete={setDeletedTasks}
                      />
                    </Stack>
                  </Stack>
                </Stack>
              )}
            </>
          )}

          <ConfirmDialog
            title="Are you sure you want to publish this credential?"
            open={confirmPublish}
            positiveAnswer="Publish"
            negativeAnswer="Cancel"
            setOpen={setConfirmPublish}
            onConfirm={methods.handleSubmit(createGate, (errors) => {
              enqueueSnackbar(
                Object.values(errors)[0].data?.message || 'Invalid data'
              );
              setCreateIsLoading(false);
              return;
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
