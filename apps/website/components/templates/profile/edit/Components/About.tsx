import { useState } from 'react';

import { useFormContext } from 'react-hook-form';

import { TOKENS } from '@gateway/theme';

import EditIcon from '@mui/icons-material/Edit';
import {
  Avatar,
  Box,
  Grid,
  Stack,
  Typography,
  Divider,
  Button,
  IconButton,
  TextField,
} from '@mui/material';

import { AvatarBackgroundFields } from '../../../../../components/molecules/form/avatar-background-fields';
import { SocialLinks } from '../../../../../components/molecules/form/social-links';
import { EditUserSchema } from '../schema';
import { Form } from './AboutComponents/Form';

export function About() {
  const { control, watch } = useFormContext<EditUserSchema>();

  return (
    <Stack
      p={TOKENS.CONTAINER_PX}
      direction="column"
      justifyContent="space-between"
      alignItems="flex-start"
      gap={6}
    >
      {/* AVATAR AND COVER */}
      <Grid
        container
        direction={{ xs: 'column', md: 'row' }}
        sx={{ rowGap: '15px', marginTop: '24px' }}
      >
        <Grid item xs={4}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ color: '#fff' }}
            ml={{ xs: '0px', md: '40px' }}
          >
            About
          </Typography>
        </Grid>
        <Grid item xs={7.5}>
          <Stack gap={6}>
            <Stack gap={4}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: '#fff', fontSize: '16px' }}
              >
                Avatar and cover
              </Typography>
              {/*cover and edit cover*/}

              <AvatarBackgroundFields
                control={control}
                avatar_name="picture"
                bg_name="cover"
              />
            </Stack>

            {/* DETAILS FORM */}
            <Form />
            {/* Social Links */}

            <Stack gap={4}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: '#fff', fontSize: '16px' }}
              >
                Social links
              </Typography>
              <SocialLinks control={control} name="socials" />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
