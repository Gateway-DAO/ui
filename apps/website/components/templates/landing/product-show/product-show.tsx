import React, { forwardRef } from 'react';

import { TOKENS } from '@gateway/theme';

import { Box, BoxTypeMap, Stack, Typography } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import {
  DEFAULT_MAX_WIDTH,
  DEFAULT_PADDINGX,
  ResponsiveImage,
} from '../styles';
import { ProductShowProps } from './types';

export const ProductShow = forwardRef<
  OverridableComponent<BoxTypeMap<Record<string, unknown>, 'div'>>,
  ProductShowProps
>(function ProductShowComponent(
  { comingSoon, title, description, image, ...rest }: ProductShowProps,
  ref
): JSX.Element {
  return (
    <Box
      component="section"
      ref={ref}
      {...rest}
      sx={(theme) => ({
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        py: '144px',
        borderBottom: '1px solid rgba(229, 229, 229, 0.12)',
        [theme.breakpoints.down('sm')]: {
          py: '124px',
        },
      })}
    >
      <Stack
        direction="column"
        sx={() => ({
          alignItems: 'center',
          width: '100%',
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
});
