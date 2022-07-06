import { useRouter } from 'next/router';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { useMutation } from 'react-query';

import { Box, Divider, Snackbar, Stack, Typography } from '@mui/material';

import { ROUTES } from '../../../constants/routes';
import { useSnackbar } from '../../../hooks/use-snackbar';
import { useAuth } from '../../../providers/auth';
import { gqlMethods } from '../../../services/api';
import { CreateNavbar } from '../../organisms/create-navbar/create-navbar';
import TaskArea from '../../organisms/tasks-area/tasks-area';
import { GateDetailsForm } from './details-form';
import { GateImageCard } from './gate-image-card/gate-image-card';
import { createGateSchema, CreateGateTypes } from './schema';

export function CreateGateTemplate() {
  const methods = useForm<CreateGateTypes>({
    resolver: yupResolver(createGateSchema),
  });

  const snackbar = useSnackbar();

  const router = useRouter();
  const { me } = useAuth();

  const updateMutation = useMutation(
    'createGate',
    !!me && gqlMethods(me).create_gate,
    {
      onSuccess() {
        snackbar.handleClick({ message: 'Profile updated!' });
        router.push(ROUTES.EXPLORE);
      },
    }
  );

  const createGate = (data: CreateGateTypes) => {
    console.log(data);
    //updateMutation.mutate({ ...data });
  };

  return (
    <Stack
      component="form"
      id="gate-details-form"
      onSubmit={methods.handleSubmit(createGate, (error) => console.log(error))}
      padding={'0 90px'}
    >
      <CreateNavbar />
      <Typography component="h1" variant="h4" sx={{ margin: '40px 0 100px 0' }}>
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
          display: { xs: 'block', md: 'flex' },
        }}
      >
        <Box>
          <Typography component="h2" variant="h5">
            Details
          </Typography>
          <Typography component="p" variant="caption">
            Lorem ipsum dolor sit amet
          </Typography>
        </Box>
        <Stack
          direction="column"
          gap={7.5}
          sx={{ maxWidth: { xs: '100%', md: '50%', lg: '40%' }, width: '100%' }}
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
              display: { xs: 'none', md: 'flex' },
              width: 400,
            }}
          />
        </FormProvider>
      </Stack>
      <Divider sx={{ margin: '60px 0' }} />

      {/* Tasks */}
      <Stack
        direction="row"
        gap={2}
        sx={{
          width: '100%',
          display: { xs: 'block', md: 'flex' },
        }}
      >
        <Box>
          <Typography component="h2" variant="h5">
            Tasks
          </Typography>
          <Typography component="p" variant="caption">
            Lorem ipsum dolor sit amet
          </Typography>
        </Box>
        <Stack direction="column" sx={{ margin: 'auto' }}>
          <Stack direction="column" gap={2}>
            <FormProvider {...methods}>
              <TaskArea />
            </FormProvider>
          </Stack>
        </Stack>
      </Stack>
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
