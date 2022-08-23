import { useRouter } from 'next/router';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { useMutation } from 'react-query';

import { Box, Divider, Snackbar, Stack, Typography } from '@mui/material';

import { ROUTES } from '../../../constants/routes';
import { useSnackbar } from '../../../hooks/use-snackbar';
import { useAuth } from '../../../providers/auth';
import { CreateNavbar } from '../../organisms/create-navbar/create-navbar';
import TaskArea from '../../organisms/tasks-area/tasks-area';
import { GateDetailsForm } from './details-form';
import { GateImageCard } from './gate-image-card/gate-image-card';
import { createGateSchema, CreateGateTypes } from './schema';

export function CreateGateTemplate() {
  const methods = useForm({
    resolver: zodResolver(createGateSchema),
    mode: 'onBlur',
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

  const createGate = (gateData: CreateGateTypes) => {
    const permissionsData = {
      data: gateData.created_by.map((creator) => {
        return { user_id: creator.id, permission: 'gate_editor' };
      }),
    };

    uploadImage(
      {
        base64: gateData.image,
        name: gateData.title,
      },
      {
        onSuccess(imageData) {
          const image_id = imageData['upload_image'].id;
          const image_url =
            process.env.NEXT_PUBLIC_NODE_ENDPOINT +
            '/storage/file?id=' +
            image_id;

          createGateMutation(
            {
              // TODO: This is Gateway's ID (temporary)
              dao_id: router.query.dao,
              title: gateData.title,
              categories: gateData.categories,
              description: gateData.description,
              skills: gateData.skills,
              permissions: permissionsData,
              image: image_url,
              tasks: gateData.tasks,
            },
            {
              onSuccess() {
                snackbar.handleClick({ message: 'Gate created!' });
                router.push(ROUTES.EXPLORE);
              },
              onError(error) {
                console.log(error);
              },
            }
          );
        },
        onError(error) {
          console.log(error);
        },
      }
    );
  };

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
      <CreateNavbar isLoading={false} />
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
              <GateDetailsForm />
            </FormProvider>
          </Stack>
        </Stack>

        <FormProvider {...methods}>
          <GateImageCard
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
            sx={{ margin: '60px 0', width: '120%', marginLeft: '-8%' }}
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
                marginLeft: 4,
                maxWidth: { xs: '100%', md: '100%', lg: '80%' },
              }}
            >
              <Stack direction="column" gap={2}>
                <FormProvider {...methods}>
                  <TaskArea />
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
