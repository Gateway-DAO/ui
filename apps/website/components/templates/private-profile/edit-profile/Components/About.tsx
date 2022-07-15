import { useState } from 'react';

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

import { Form } from './AboutComponents/Form';

export function About() {
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
              <Box
                sx={{
                  height: (theme) => theme.spacing(35),
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  background:
                    'linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 44.13%), linear-gradient(82.31deg, #FCB5DB 17.7%, #8965D2 57.63%);',
                  backdropFilter: 'blur(40px)',
                  border: '1px solid #594979',
                  pt: 2,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  borderRadius: '8px',
                }}
              >
                <IconButton sx={{ zIndex: '13' }}>
                  <Avatar
                    sx={{
                      backgroundColor: '#fff',
                      color: 'rgba(0, 0, 0, 0.54)',
                      width: '34.5px',
                      height: '34.5px',
                    }}
                  >
                    <EditIcon></EditIcon>
                  </Avatar>
                </IconButton>
              </Box>
              <Box
                sx={{
                  marginTop: -10,
                  marginLeft: 4,
                  position: 'relative',
                  zIndex: '12',
                }}
              >
                {/*avatar and edit avatar*/}
                <Avatar
                  sx={{
                    width: { xs: '72px', md: '88px' },
                    height: { xs: '72px', md: '88px' },
                    border: (theme) => `${theme.spacing(0.5)} solid`,
                    borderColor: 'background.default',
                  }}
                ></Avatar>
                <IconButton
                  sx={{ position: 'absolute', bottom: '-10px', left: '8%' }}
                >
                  <Avatar
                    sx={{
                      backgroundColor: '#fff',
                      color: 'rgba(0, 0, 0, 0.54)',
                      width: '34.5px',
                      height: '34.5px',
                    }}
                  >
                    <EditIcon></EditIcon>
                  </Avatar>
                </IconButton>
              </Box>
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
              <Stack></Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
