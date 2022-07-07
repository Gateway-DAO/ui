import React from 'react';

import { Box, Typography } from '@mui/material';

import { LandingTitleLimiter } from '../styles';
import Title from '../title';
import { forUsersProps } from './types';

export function ForUsers({
  mainTitle,
  secondaryTitle,
  features,
}: forUsersProps): JSX.Element {
  console.log(features);
  return (
    <Box
      component="section"
      id="users"
      sx={(theme) => ({
        paddingTop: theme.spacing(26),
        paddingBottom: theme.spacing(14),
      })}
    >
      <Title>
        <LandingTitleLimiter>{mainTitle}</LandingTitleLimiter>
      </Title>
      <Typography
        component="h2"
        variant="subtitle1"
        sx={(theme) => ({
          color: theme.palette.secondary.main,
          marginTop: '32px',
          maxWidth: '368px',
        })}
      >
        {secondaryTitle}
      </Typography>
    </Box>
  );
}
