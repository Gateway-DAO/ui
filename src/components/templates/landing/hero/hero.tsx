import React, { forwardRef } from 'react';

import { MotionBox } from '@/components/atoms/motion-components';

import { ArrowDownward } from '@mui/icons-material';
import { useMediaQuery, useTheme } from '@mui/material';
import { Box, Button, Hidden, Stack, Typography } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { BoxTypeMap } from '@mui/system';

import BackgroundImage from '../../../../../public/images/hero-background.png';
import { DEFAULT_MAX_WIDTH, DEFAULT_PADDINGX } from '../styles';
import { HeroBackground } from './styles';
import { HeroProps } from './types';

export const Hero = forwardRef<
  OverridableComponent<BoxTypeMap<Record<string, unknown>, 'div'>>,
  HeroProps
>(function HeroComponent(
  { enterButton, title, subtitle, titleDescription }: HeroProps,
  ref
): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  return (
    <Box
      ref={ref}
      component="section"
      sx={(theme) => ({
        width: '100%',
        height: { sm: '100vh', xs: '100%' },
        position: 'relative',
        borderBottom: '1px solid rgba(229, 229, 229, 0.12)',
      })}
    >
      <Stack
        direction="column"
        sx={{
          flex: 1,
          width: '100%',
          height: '100%',
        }}
      >
        <MotionBox
          sx={(theme) => ({
            display: 'flex',
            flex: 1,
            position: 'relative',
            flexDirection: 'column',
            alignItems: 'flex-start',
            zIndex: 2,
            paddingTop: theme.spacing(36),
            [theme.breakpoints.down('sm')]: {
              paddingTop: theme.spacing(20),
            },
          })}
          initial={{ translateY: 20, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{
            ease: 'easeOut',
            duration: 0.75,
            opacity: { duration: 0.5 },
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={(theme) => ({
              whiteSpace: 'pre-wrap',
              fontSize: '4.875rem',
              maxWidth: '760px',
              [theme.breakpoints.down('md')]: {
                ...theme.typography.h3,
              },
              [theme.breakpoints.down('sm')]: {
                ...theme.typography.h4,
                maxWidth: '80%',
              },
            })}
          >
            <Typography
              component="span"
              sx={(theme) => ({
                color: theme.palette.primary.main,
                display: 'block',
                fontSize: 'inherit',
                fontWeight: 'inherit',
                lineHeight: 'inherit',
              })}
            >
              {title}
            </Typography>
            {subtitle}
          </Typography>
          <Typography
            component="h2"
            variant="subtitle1"
            sx={(theme) => ({
              color: theme.palette.secondary.main,
              marginTop: '34px',
              maxWidth: '338px',
              [theme.breakpoints.down('sm')]: {
                maxWidth: '90%',
              },
            })}
          >
            {titleDescription}
          </Typography>
          {enterButton}
        </MotionBox>
        <Box
          sx={
            isMobile && {
              position: 'absolute',
              bottom: 0,
              zIndex: 2,
            }
          }
        >
          <Button
            variant="outlined"
            component="a"
            href="#credential-model"
            sx={(theme) => ({
              borderRadius: '50%',
              padding: '20px',
              marginTop: '70px',
              mb: '64px',
              borderColor: theme.palette.secondary.main,
              [theme.breakpoints.down('sm')]: {
                marginTop: 'auto',
                mb: '0',
                marginBottom: '30px',
              },
            })}
          >
            <ArrowDownward
              sx={(theme) => ({
                color: theme.palette.secondary.main,
              })}
            />
            <Box component="i" sx={{ display: 'none' }}>
              Users
            </Box>
          </Button>
        </Box>
        <MotionBox
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            ease: 'easeOut',
            duration: 1,
            opacity: { duration: 0.5 },
          }}
          style={
            isMobile && {
              height: 'auto',
              width: '140%',
              top: -20,
            }
          }
          sx={(theme) => ({
            width: 'auto',
            position: 'absolute',
            bottom: '0',
            right: `-${DEFAULT_PADDINGX}`,

            [theme.breakpoints.down('sm')]: {
              position: 'relative',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              left: `-${DEFAULT_PADDINGX}`,
            },
          })}
        >
          <HeroBackground
            src={BackgroundImage}
            alt="Gateway's background with people joining the network"
          />
        </MotionBox>
      </Stack>
    </Box>
  );
});
