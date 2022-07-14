import React, { forwardRef, useRef } from 'react';

import { TOKENS } from '@gateway/theme';
import { MotionBox } from '@gateway/ui';

import {
  Box,
  BoxTypeMap,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import { useActiveScroll } from '../../../../hooks/use-active-scroll';
import { LandingTitleLimiter, ResponsiveImage } from '../styles';
import Title from '../title';
import { FeaturedProps } from './types';

export const Featured = forwardRef<
  OverridableComponent<BoxTypeMap<Record<string, unknown>, 'div'>>,
  FeaturedProps
>(function FeaturedComponent(
  { mainTitle, secondaryTitle, id, features }: FeaturedProps,
  ref
): JSX.Element {
  const myRefs = useRef<HTMLDivElement[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { activeIndex, scrollTo } = useActiveScroll(myRefs);

  return (
    <Box
      component="section"
      id={id}
      ref={ref}
      sx={(theme) => ({
        pt: theme.spacing(26),
        pb: theme.spacing(14),
        flex: 1,
        width: '100%',
        py: '144px',
        borderBottom: '1px solid rgba(229, 229, 229, 0.12)',
        [theme.breakpoints.down('sm')]: {
          py: '124px',
        },
      })}
    >
      <Title>
        <LandingTitleLimiter>{mainTitle}</LandingTitleLimiter>
      </Title>
      <Typography
        component="h2"
        variant="subtitle1"
        sx={(theme) => ({
          color: theme.palette.text.secondary,
          marginTop: '32px',
          maxWidth: '368px',
          mb: '64px',
        })}
      >
        {secondaryTitle}
      </Typography>
      <Stack>
        {features.map((feature, index) => (
          <Box
            key={feature.title}
            id={`item${index}`}
            onClick={!isMobile ? () => scrollTo(index) : null}
            sx={(theme) => ({
              position: 'relative',
              borderBottom: '1px solid rgba(229, 229, 229, 0.12)',
              '&:last-child': {
                borderBottom: 'none',
              },
              [theme.breakpoints.down('sm')]: {
                pb: '50px',
              },
            })}
            ref={(el: HTMLDivElement) => (myRefs.current[index] = el)}
          >
            <Box
              sx={(theme) => ({
                cursor: 'pointer',
                py: '64px',
                [theme.breakpoints.down('sm')]: {
                  py: '40px',
                  cursor: 'default',
                },
              })}
            >
              <Typography
                component="h3"
                variant="h4"
                sx={(theme) => ({
                  color: !isMobile
                    ? activeIndex === index
                      ? theme.palette.text.primary
                      : theme.palette.text.secondary
                    : theme.palette.text.primary,
                  [theme.breakpoints.down('md')]: {
                    ...theme.typography.h4,
                  },
                  [theme.breakpoints.down('sm')]: {
                    ...theme.typography.h6,
                  },
                })}
              >
                {feature.title}
              </Typography>
              <Typography
                component="p"
                sx={(theme) => ({
                  marginTop: '16px',
                  maxWidth: '466px',
                  color:
                    activeIndex === index
                      ? theme.palette.text.primary
                      : theme.palette.text.secondary,
                })}
              >
                {feature.description}
              </Typography>
            </Box>
            <MotionBox
              animate={
                !isMobile ? (activeIndex === index ? 'active' : 'inactive') : ''
              }
              variants={{
                active: { opacity: 1, y: '-50%' },
                inactive: { opacity: 0, y: '-30%' },
              }}
              sx={(theme) => ({
                position: 'absolute',
                top: '50%',
                right: '0',
                maxWidth: '100%',
                [theme.breakpoints.down('sm')]: {
                  position: 'relative',
                  top: 'unset',
                  right: 'unset',
                  width: '100%',
                },
              })}
              transition={{
                ease: 'easeOut',
                duration: 0.75,
                opacity: { duration: 0.5 },
              }}
            >
              <picture>
                <ResponsiveImage
                  src={feature.image.url}
                  alt={feature.title}
                  srcSet={`${feature.image.url} 1x, ${feature.image.url.replace(
                    '.png',
                    '@2x.png'
                  )} 2x`}
                />
              </picture>
            </MotionBox>
          </Box>
        ))}
      </Stack>
    </Box>
  );
});
