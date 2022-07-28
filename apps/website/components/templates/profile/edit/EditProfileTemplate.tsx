import { useRouter } from 'next/router';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { TOKENS } from '@gateway/theme';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Avatar,
  Box,
  Stack,
  Typography,
  Divider,
  Button,
  IconButton,
} from '@mui/material';

import { useAuth } from '../../../../providers/auth';
import { LoadingButton } from '../../../atoms/loading-button';
import { About } from '../../profile/edit/Components/About';
import { Experiences } from '../../profile/edit/Components/Experiences';
import { Languages } from '../../profile/edit/Components/Languages';
import { Skills } from '../../profile/edit/Components/Skills';
import { TimeZone } from '../../profile/edit/Components/TimeZone';
import { schema, defaultValues, EditUserSchema } from './schema';

type Props = {
  onSubmit: (data: EditUserSchema) => Promise<unknown>;
  isLoading: boolean;
};

export function EditProfileTemplate({ onSubmit, isLoading }: Props) {
  const router = useRouter();
  const { me } = useAuth();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues(me),
    mode: 'onBlur',
  });

  return (
    <Stack
      component="form"
      onSubmit={methods.handleSubmit(onSubmit, (error) => {
        console.log('Error', error);
      })}
    >
      <Box
        sx={{
          paddingLeft: { xs: '14px', md: '85px' },
          paddingTop: { xs: '24px', md: '40px' },
          background:
            ' linear-gradient(180deg, #10041C 0%, rgba(16, 4, 28,0) 100%)',
          position: 'fixed',
          width: '100%',
          height: '105px',
          zIndex: '10000',
        }}
      >
        <IconButton
          sx={{
            p: 0,
          }}
          onClick={() => router.back()}
        >
          <Avatar>
            <ArrowBackIcon></ArrowBackIcon>
          </Avatar>
        </IconButton>
        <Box
          sx={{
            display: 'flex',
            position: 'absolute',
            top: { xs: '24px', md: '40px' },
            right: { xs: '18px', md: '96px' },
            cursor: 'pointer',
          }}
        >
          <LoadingButton
            variant="contained"
            type="submit"
            isLoading={isLoading}
          >
            Submit
          </LoadingButton>
        </Box>
      </Box>
      <Box sx={{ height: '80px' }}></Box>
      <Box p={TOKENS.CONTAINER_PX}>
        <Typography
          variant="h4"
          sx={{ marginBottom: '4px', color: '#fff' }}
          ml={{ xs: '0px', md: '40px' }}
        >
          Edit profile
        </Typography>
        <Typography
          variant="caption"
          sx={{ display: 'block', color: 'rgba(255, 255, 255, 0.7)' }}
          ml={{ xs: '0px', md: '40px' }}
        >
          Information provided will be displayed on your Gateway profile.
        </Typography>
      </Box>

      {/*Components*/}

      <FormProvider {...methods}>
        <div id="about">
          <About />
        </div>
        <Divider light sx={{ width: '100%' }} />
        {/*<div id="experiences">
          <Experiences />
        </div>
        <Divider light sx={{ width: '100%' }} />*/}
        <div id="skills">
          <Skills />
        </div>
        <Divider light sx={{ width: '100%' }} />
        <div id="languages">
          <Languages />
        </div>
        <Divider light sx={{ width: '100%' }} />
        <div id="timezones">
          <TimeZone />
        </div>
      </FormProvider>
    </Stack>
  );
}
