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
import { GateTypeChanger } from './gate-type-selector/gate-type-changer';
import { GateTypeSelector } from './gate-type-selector/gate-type-selector';
import { createGateSchema, CreateGateData, GateType } from './schema';
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
    defaultValues: oldData,
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
    gqlAuthMethods.create_gate_tasks_based
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
      enqueueSnackbar(
        Object.values(errors)[0].data?.message ||
          taskErrorMessage(errors?.tasks) ||
          'Invalid data',
        {
          variant: 'error',
        }
      );
    }

    return dataIsValid;
  };

  const handleMutation = async (data: CreateGateData, isDraft: boolean) => {
    const dataIsValid = await checkFormErrors();

    if (!dataIsValid) return;

    const permissionsData = data.created_by?.map((creator) => {
      return { user_id: creator.id, permission: 'gate_editor' };
    });
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
        deletedTasks.map((task_id) =>
          deleteTask.mutateAsync({
            task_id,
          })
        )
      );
    }
    if (data.title) {
      delete data.created_by;
      const response = await createGate.mutateAsync({
        ...data,
        id: oldData.id || uuidv4(),
        dao_id: router.query.dao,
        title: data.title,
        categories: data.categories || [],
        description: data.description,
        skills: data.skills || [],
        permissions: permissionsData,
        image: image_url,
        tasks: data.tasks?.map(({ task_id, ...task }, index) => ({
          ...task,
          id: task_id,
          order: index,
        })),
        published: 'not_published',
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
            [theme.breakpoints.down('sm')]: { p: '0 20px' },
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
          {hasTitleAndDescription && (
            <>
              <Divider sx={{ margin: '60px 0', width: '100%' }} />
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
                    margin: 'auto',
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
                        draftTasks={oldData.tasks || []}
                        onDelete={setDeletedTasks}
                      />
                    </Stack>
                  )}
                </Stack>
              </Stack>
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
                Object.values(errors)[0].data?.message || 'Invalid data'
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
