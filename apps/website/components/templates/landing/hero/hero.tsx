import dynamic from 'next/dynamic';
import Image from 'next/image';

import { MotionBox } from '@gateway/ui';

import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/system';

import { HeroProps } from './types';
const Title = dynamic(() => import('../title'));

export function Hero({
  enterButton,
  title,
  subtitle,
  titleDescription,
}: HeroProps): JSX.Element {
  return (
    <Stack direction="column" sx={{ flex: 1, width: '100%' }}>
      <MotionBox
        sx={{
          display: 'flex',
          position: 'absolute',
          flexDirection: 'column',
          alignItems: 'flex-start',
          zIndex: 2,
          top: (theme) => theme.spacing(14),
        }}
        initial={{ translateY: 20, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{
          ease: 'easeOut',
          duration: 0.75,
          opacity: { duration: 0.5 },
        }}
      >
        <Title>
          <Typography
            component="span"
            variant="h1"
            sx={(theme) => ({
              color: theme.palette.primary.main,
              display: 'block',
            })}
          >
            {title}
          </Typography>
          {subtitle}
        </Title>
        <Typography
          component="h2"
          variant="subtitle1"
          sx={(theme) => ({
            color: theme.palette.secondary.main,
            marginTop: '34px',
            maxWidth: '338px',
          })}
        >
          {titleDescription}
        </Typography>
        {enterButton}
      </MotionBox>
      <Box
        sx={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          ':before': {
            background: (theme) =>
              `linear-gradient(to bottom, ${
                theme.palette.background.default
              } 0%, ${alpha(theme.palette.background.default, 0)} 35%)`,
            content: '""',
            position: 'absolute',
            inset: 0,
            zIndex: 1,
          },
        }}
      >
        <MotionBox
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            ease: 'easeOut',
            duration: 1,
            opacity: { duration: 0.5 },
          }}
          sx={{
            width: '61%',
            height: '86%',
            position: 'absolute',
            bottom: '0',
            right: '0',
          }}
        >
          <Image
            src="/images/hero-background.png"
            layout="fill"
            objectFit="cover"
            width={881}
            height={881}
            alt="Gateway's background image"
          />
        </MotionBox>
      </Box>
    </Stack>
  );
}
