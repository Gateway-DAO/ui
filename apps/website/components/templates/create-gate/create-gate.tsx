import { useRouter } from 'next/router';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm, FormProvider } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { Box, Divider, Snackbar, Stack, Typography } from '@mui/material';

import { ROUTES } from '../../../constants/routes';
import { useSnackbar } from '../../../hooks/use-snackbar';
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
import { createGateSchema, CreateGateTypes, DraftGateTypes } from './schema';

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
  }) => ({ title, categories, description, skills, created_by }))(oldData);

  const methods = useForm({
    resolver: zodResolver(createGateSchema),
    mode: 'onBlur',
  });

  const snackbar = useSnackbar();

  const router = useRouter();
  const { gqlAuthMethods } = useAuth();

  const [gateId, setGateId] = useState(oldData.id || '');
  const [confirmPublish, setConfirmPublish] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [draftIsLoading, setDraftIsLoading] = useState(false);
  const [createIsLoading, setCreateIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const [deletedTasks, setDeletedTasks] = useState<string[]>([]);

  const { mutateAsync: uploadImage } = useMutation(
    ['uploadImage'],
    gqlAuthMethods.upload_image
  );

  const { mutateAsync: createGateMutation } = useMutation(
    ['createGate'],
    gqlAuthMethods.create_gate
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
      snackbar.onOpen({
        message: Object.values(errors)[0].data?.message || 'Invalid data',
      });
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
            snackbar.onOpen({
              message: "An error occured, couldn't upload the image.",
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
            data: data.tasks.data.map((task) => {
              const { task_id, ...cleanTask } = task;
              return { id: task_id, ...cleanTask };
            }),
            on_conflict: {
              constraint: Tasks_Constraint.KeysPk,
              update_columns: [
                Tasks_Update_Column.Title,
                Tasks_Update_Column.Description,
                Tasks_Update_Column.TaskData,
                Tasks_Update_Column.TaskType,
              ],
            },
          },
          published: isDraft ? 'not_published' : 'published',
        },
        {
          onSuccess(result) {
            if (isDraft) {
              snackbar.onOpen({
                message: 'Draft saved',
              });
              setDraftIsLoading(false);
              router.push(
                ROUTES.GATE_PROFILE.replace('[id]', result.insert_gates_one.id)
              );
            } else {
              setGateId(result.insert_gates_one.id);
              setResult(result.insert_gates_one);
              setIsPublished(true);
            }
          },
          onError() {
            isDraft ? setDraftIsLoading(false) : setCreateIsLoading(false);
            snackbar.onOpen({
              message: isDraft
                ? "An error occured, couldn't save the draft."
                : "An error occured, couldn't create the gate.",
            });
          },
        }
      );
    }
    isDraft ? setDraftIsLoading(false) : setCreateIsLoading(false);
  };

  const saveDraft = (draftData: CreateGateTypes) =>
    handleMutation(draftData, true);

  const createGate = (gateData: CreateGateTypes) =>
    handleMutation(gateData, false);

  const hasTitleAndDescription = methods
    .watch(['title', 'description'])
    .every((value) => !!value);

  return (
    <>
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
        <FormProvider {...methods}>
          <PublishNavbar
            draftIsLoading={draftIsLoading}
            createIsLoading={createIsLoading}
            saveDraft={saveDraft}
          />
        </FormProvider>
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
              <FormProvider {...methods}>
                <GateDetailsForm gateData={gateDetails} />
              </FormProvider>
            </Stack>
          </Stack>

          <FormProvider {...methods}>
            <GateImageCard
              draftImage={oldData.image}
              label="Drop to upload your credential image"
              sx={{
                width: 400,
              }}
            />
          </FormProvider>
        </Stack>

        {/* Tasks */}
        {(hasTitleAndDescription ||
          (gateDetails.title && gateDetails.description)) && (
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
                  Set requirements
                </Typography>
                <Typography
                  variant="body2"
                  color={'text.secondary'}
                  marginBottom={4}
                >
                  Define the requirements that the user must meet to obtain the
                  credential
                </Typography>
              </Box>
              <Stack
                direction="column"
                sx={{
                  margin: 'auto',
                  maxWidth: { xs: '100%', md: '100%', lg: '80%' },
                }}
              >
                <Stack direction="column" gap={2}>
                  <FormProvider {...methods}>
                    <TaskArea
                      draftTasks={oldData.tasks || []}
                      onDelete={setDeletedTasks}
                    />
                  </FormProvider>
                </Stack>
              </Stack>
            </Stack>
          </>
        )}

        <Snackbar
          anchorOrigin={{
            vertical: snackbar.vertical,
            horizontal: snackbar.horizontal,
          }}
          open={snackbar.open}
          onClose={snackbar.handleClose}
          message={snackbar.message}
          key={snackbar.vertical + snackbar.horizontal}
        />
        <ConfirmDialog
          title="Are you sure you want to publish this gate?"
          open={confirmPublish}
          positiveAnswer="Publish"
          negativeAnswer="Cancel"
          setOpen={setConfirmPublish}
          onConfirm={methods.handleSubmit(createGate, (errors) => {
            snackbar.onOpen({
              message: Object.values(errors)[0].data?.message || 'Invalid data',
            });
            setCreateIsLoading(false);
            return;
          })}
        >
          If you publish this gate, you will no longer be allowed to edit it.
          You can unpublish or delete the credential any time.
        </ConfirmDialog>
        <GatePublishedModal
          open={isPublished}
          handleClose={closePublishedModal}
          gate={result}
        />
      </Stack>
    </>
  );
}
