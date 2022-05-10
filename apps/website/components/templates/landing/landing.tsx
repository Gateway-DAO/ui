import Image from 'next/image';
import { ReactNode } from 'react';

import { GatewayIcon } from '@gateway/assets';
import { TOKENS } from '@gateway/theme';
import { MotionBox } from '@gateway/ui';

import { Stack, Box, Typography, alpha } from '@mui/material';

type Props = {
  title: string;
  connectButton: ReactNode;
};

export function LandingTemplate({ title, connectButton }: Props) {
  return (
    <Stack direction="column" sx={{ height: '100%' }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px={TOKENS.CONTAINER_PX}
        py={4}
      >
        <GatewayIcon sx={{ width: 50, height: 50 }} />
        {connectButton}
      </Stack>
      <Box
        sx={{
          display: 'flex',
          position: 'absolute',
          zIndex: 2,
          top: (theme) => theme.spacing(14),
          left: 0,
          right: 0,
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            textAlign: 'center',
            whiteSpace: 'pre-wrap',
          }}
        >
          {title}
        </Typography>
      </Box>
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
          /*         initial={{ clipPath: 'circle(0% at 50% 75%)' }}
        animate={{ clipPath: 'circle(100% at 50% 75%)' }}
        transition={{ duration: 0.75 }} */
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            ease: 'easeOut',
            duration: 1,
            opacity: { duration: 0.5 },
          }}
          sx={{ width: '100%', height: '100%' }}
        >
          <Image
            src="/images/home.jpg"
            layout="fill"
            objectFit="cover"
            alt="Gateway's background image"
          />
        </MotionBox>
      </Box>
    </Stack>
  );
}
