import React from 'react';

import { TOKENS } from '@gateway/theme';

import { Box, Stack, Typography } from '@mui/material';

import { ResponsiveImage } from '../styles';
import { ProductShowProps } from './types';

export function ProductShow({
  comingSoon,
  title,
  description,
  image,
  ...rest
}: ProductShowProps): JSX.Element {
  return (
    <Box
      component="section"
      {...rest}
      sx={() => ({
        display: 'flex',
        justifyContent: 'center',
        pt: '80px',
        px: TOKENS.CONTAINER_PX,
      })}
    >
      <Stack
        direction="column"
        sx={() => ({
          alignItems: 'center',
          width: '100%',
          borderBottom: '1px solid rgba(229, 229, 229, 0.12)',
        })}
      >
        {comingSoon && (
          <Typography
            component="p"
            variant="body1"
            sx={(theme) => ({
              textTransform: 'uppercase',
              color: theme.palette.primary.main,
            })}
          >
            {comingSoon}
          </Typography>
        )}
        <Typography
          component="h1"
          variant="h1"
          sx={(theme) => ({
            textAlign: 'center',
            maxWidth: '770px',
            pb: '24px',
            [theme.breakpoints.down('md')]: {
              ...theme.typography.h3,
            },
            [theme.breakpoints.down('sm')]: {
              ...theme.typography.h4,
            },
          })}
        >
          {title}
        </Typography>
        <Typography
          component="h2"
          variant="subtitle1"
          sx={(theme) => ({
            color: theme.palette.secondary.main,
            textAlign: 'center',
            maxWidth: '550px',
            pb: '24px',
          })}
        >
          {description}
        </Typography>
        <ResponsiveImage
          src={image.url}
          alt={title}
          layout="raw"
          width={image.width}
          height={image.height}
        />
      </Stack>
    </Box>
  );
}
