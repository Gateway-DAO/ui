import React, { forwardRef } from 'react';

import { TOKENS } from '@gateway/theme';

import {
  Avatar,
  Box,
  BoxTypeMap,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';
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
  {
    comingSoon,
    title,
    description,
    image,
    revert,
    features,
    ...rest
  }: ProductShowProps,
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
        py: '144px',
        ...(revert
          ? { borderBottom: 'none' }
          : { borderBottom: '1px solid rgba(229, 229, 229, 0.12)' }),
        [theme.breakpoints.down('sm')]: {
          py: '124px',
        },
      })}
    >
      <Stack direction="column" sx={() => ({ width: '100%' })}>
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
        {description && (
          <Typography
            component="h2"
            variant="subtitle1"
            sx={(theme) => ({
              color: theme.palette.text.secondary,
              maxWidth: '550px',
              pb: '24px',
            })}
          >
            {description}
          </Typography>
        )}
        <Box
          sx={(theme) => ({
            display: 'flex',
            width: '100%',
            height: '100%',
            mt: '88px',
            justifyContent: 'space-between',
            ...(revert ? { flexDirection: 'row-reverse' } : {}),
            [theme.breakpoints.down('sm')]: {
              mt: '67px',
              justifyContent: 'unset',
              flexDirection: 'column',
            },
          })}
        >
          <Stack
            direction="column"
            sx={(theme) => ({
              maxWidth: '368px',
              pt: '130px',
              height: '100%',
              [theme.breakpoints.down('sm')]: {
                pt: 0,
              },
            })}
          >
            {features.map((feature, index) => (
              <Box
                key={feature.title + index}
                sx={(theme) => ({
                  flex: 1,
                  [theme.breakpoints.down('sm')]: {
                    mb: '40px',
                  },
                })}
              >
                <Typography
                  component="h2"
                  variant="h4"
                  sx={(theme) => ({
                    mb: '16px',
                    [theme.breakpoints.down('sm')]: {
                      ...theme.typography.h6,
                    },
                  })}
                >
                  {feature.title}
                </Typography>
                <Typography variant="body1">{feature.description}</Typography>
              </Box>
            ))}
          </Stack>
          <picture>
            <ResponsiveImage
              src={image.url}
              srcSet={`${image.url} 1x, ${image.url.replace(
                '.png',
                '@2x.png'
              )} 2x`}
              alt={title}
            />
          </picture>
        </Box>
      </Stack>
    </Box>
  );
});
