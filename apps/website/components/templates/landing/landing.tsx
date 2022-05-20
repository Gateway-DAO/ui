import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ReactNode, Suspense } from 'react';
import * as React from 'react';

import { GatewayIcon } from '@gateway/assets';
import { TOKENS } from '@gateway/theme';
import { MotionBox } from '@gateway/ui';

import { Stack, Box, alpha, Button } from '@mui/material';

import PocModalCreated from '../../organisms/poc-modal-created/poc-modal-created';
const Title = dynamic(() => import('./title'));

type Props = {
  title: string;
  connectButton: ReactNode;
};

export function LandingTemplate({ title, connectButton }: Props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Stack direction="column" sx={{ flex: 1, width: '100%' }}>
      <PocModalCreated open={open} handleClose={handleClose} />
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
      <MotionBox
        sx={{
          display: 'flex',
          position: 'absolute',
          zIndex: 2,
          top: (theme) => theme.spacing(14),
          left: 0,
          right: 0,
          justifyContent: 'center',
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
          {title} <Button onClick={handleOpen}>Open modal</Button>
        </Title>
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
