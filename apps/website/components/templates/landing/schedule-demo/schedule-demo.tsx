import Link from 'next/link';
import React from 'react';

import { TOKENS } from '@gateway/theme';

import { Box, Button, Stack, Typography } from '@mui/material';

import { ScheduleDemoImage } from './styles';
import { ScheduleDemoProps } from './types';

export function ScheduleDemo({
  title,
  scheduleButton,
  joinDiscord,
}: ScheduleDemoProps): JSX.Element {
  return (
    <Box
      component="section"
      sx={(theme) => ({
        my: '20px',
        px: TOKENS.CONTAINER_PX,
      })}
    >
      <Box
        sx={{
          border: '1px solid rgba(229, 229, 229, 0.12)',
          p: '48px',
          borderRadius: '24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <ScheduleDemoImage
          src="/images/schedule-demo-background.png"
          layout={'fill'}
          objectFit={'cover'}
        />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            component="h1"
            variant="h4"
            sx={(theme) => ({
              pb: '24px',
              maxWidth: '316px',
              mb: '40px',
              [theme.breakpoints.down('sm')]: {
                ...theme.typography.h4,
              },
            })}
          >
            {title}
          </Typography>
          <Stack direction="row" sx={(theme) => ({})}>
            <Link passHref href={'#'}>
              <Button
                variant="contained"
                size="large"
                sx={(theme) => ({
                  height: '42px',
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                  mr: '10px',
                })}
              >
                {scheduleButton}
              </Button>
            </Link>
            <Link passHref href={'#'}>
              <Button
                variant="outlined"
                size="large"
                sx={(theme) => ({
                  height: '42px',
                })}
              >
                {joinDiscord}
              </Button>
            </Link>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
