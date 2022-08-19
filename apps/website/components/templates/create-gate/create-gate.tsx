import { useRouter } from 'next/router';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { useMutation } from 'react-query';
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
import { PublishNavbar } from '../../organisms/publish-navbar/publish-navbar';
import TaskArea from '../../organisms/tasks-area/tasks-area';
import { GateDetailsForm } from './details-form';
import { GateImageCard } from './gate-image-card/gate-image-card';
import { createGateSchema, CreateGateTypes, DraftGateTypes } from './schema';

type CreateGateProps = {
  oldData: DraftGateTypes;
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
    mode: 'onSubmit',
  });

  const snackbar = useSnackbar();

  const router = useRouter();
  const { gqlAuthMethods } = useAuth();

  const { mutate: uploadImage } = useMutation(
    'uploadImage',
    gqlAuthMethods.upload_image
  );

  const { mutate: createGateMutation } = useMutation(
    'createGate',
    gqlAuthMethods.create_gate
  );

  const handleMutation = (data: CreateGateTypes, isDraft: boolean) => {
    let permissionsData = null;
    let image_url = oldData.image || null;

    if (data.created_by.length > 0) {
      permissionsData = {
        data: data.created_by.map((creator) => {
          return { user_id: creator.id, permission: 'gate_editor' };
        }),
      };
    }

    if (!image_url && data.image) {
      uploadImage(
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
          onError(error) {
            console.log(error);
          },
        }
      );
    }

    if (data.title) {
      createGateMutation(
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
            ...data.tasks,
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
            snackbar.handleClick({
              message: isDraft ? 'Draft saved' : 'Gate created',
            });
            router.push(
              ROUTES.GATE_PROFILE.replace('[id]', result.insert_gates_one.id)
            );
          },
          onError(error) {
            console.log(error);
          },
        }
      );
    }
  };

  const saveDraft = (draftData: CreateGateTypes) =>
    handleMutation(draftData, true);

  const createGate = (gateData: CreateGateTypes) =>
    handleMutation(gateData, false);

  const hasTitleAndDescription = methods
    .watch(['title', 'description'])
    .every((value) => !!value);

  return (
    <Stack
      component="form"
      id="gate-details-form"
      onSubmit={methods.handleSubmit(createGate, (error) => console.log(error))}
      padding={'0 90px'}
      sx={(theme) => ({
        p: '0 90px',
        [theme.breakpoints.down('sm')]: { p: '0 20px' },
      })}
    >
      <FormProvider {...methods}>
        <PublishNavbar isLoading={false} saveDraft={saveDraft} />
      </FormProvider>
      <Typography
        component="h1"
        variant="h4"
        sx={{ margin: '40px 0 40px 0', marginBottom: { md: '100px' } }}
      >
        Create Gate
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
          <Typography component="h2" variant="h5">
            Details
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
            sx={{
              width: 400,
            }}
          />
        </FormProvider>
      </Stack>

      {/* Tasks */}
      {hasTitleAndDescription && (
        <>
          <Divider
            sx={{ margin: '60px 0', width: '200%', marginLeft: '-50%' }}
          />
          <Stack
            direction="row"
            gap={{ lg: 5, xs: 2, md: 2 }}
            sx={{
              width: '100%',
              display: { xs: 'block', md: 'flex' },
            }}
          >
            <Box sx={{ minWidth: { lg: '20%' }, marginBottom: { xs: '40px' } }}>
              <Typography component="h2" variant="h5">
                Tasks
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
                  <TaskArea tasks={oldData.tasks || []} />
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
    </Stack>
  );
}
