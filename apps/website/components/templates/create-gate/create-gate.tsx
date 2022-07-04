import { useRouter } from 'next/router';
import { useState } from 'react';

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

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState([{ name: me.name, id: me.id }]);
  const [skills, setSkills] = useState([]);

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

  const createGate = () => {
    const data = { title, image, categories, description, createdBy, skills };
    console.log(data);
    //updateMutation.mutate({ ...data });
  };

  const updateValue = (field, value) => {
    switch (field) {
      case 'title':
        console.log('here', value);
        setTitle(value);
        break;
      case 'image':
        setImage(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'created_by':
        setCreatedBy(value);
        break;
      default:
        break;
    }
  };

  const updateArray = (field, value) => {
    switch (field) {
      case 'categories':
        setCategories(value);
        break;
      case 'skills':
        setSkills(value);
        break;
      default:
        break;
    }
  };

  return (
    <Stack padding={'0 90px'}>
      <CreateNavbar publish={createGate} />
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
              <GateDetailsForm
                onSubmit={createGate}
                updateValue={updateValue}
                updateArray={updateArray}
                isLoading={updateMutation.isLoading}
              />
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
            <TaskArea />
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
