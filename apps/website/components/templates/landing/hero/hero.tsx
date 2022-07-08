import dynamic from 'next/dynamic';

import { TOKENS } from '@gateway/theme';
import { MotionBox } from '@gateway/ui';

import { ArrowDownward } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';

import BackgroundImage from '../../../../public/images/hero-background.png';
import { HeroBackground } from './styles';
import { HeroProps } from './types';
const Title = dynamic(() => import('../title'));

export function Hero({
  enterButton,
  title,
  subtitle,
  titleDescription,
}: HeroProps): JSX.Element {
  return (
    <Box
      component="section"
      sx={{
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <Stack
        direction="column"
        sx={{
          flex: 1,
          width: '100%',
          height: '100%',
          px: TOKENS.CONTAINER_PX,
        }}
      >
        <MotionBox
          sx={{
            display: 'flex',
            flex: 1,
            position: 'relative',
            flexDirection: 'column',
            alignItems: 'flex-start',
            zIndex: 2,
            paddingTop: (theme) => theme.spacing(26),
          }}
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

          <Button
            variant="outlined"
            component="a"
            href="#users"
            sx={(theme) => ({
              borderRadius: '50%',
              padding: '20px',
              marginTop: '70px',
              borderColor: theme.palette.secondary.main,
              [theme.breakpoints.down('sm')]: {
                marginTop: 'auto',
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
        </MotionBox>
      </Stack>
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
        <HeroBackground
          src={BackgroundImage}
          layout="raw"
          alt="Gateway's background with people joining the network"
        />
      </MotionBox>
      <Box
        sx={(theme) => ({
          [theme.breakpoints.down('sm')]: {
            height: '30%',
            width: '100%',
            position: 'absolute',
            zIndex: 0,
            bottom: 0,
            left: 0,
            background:
              'linear-gradient(0deg, rgba(0, 0, 0, 0.64) 0%, rgba(0, 0, 0, 0) 100%)',
          },
        })}
      ></Box>
    </Box>
  );
}
