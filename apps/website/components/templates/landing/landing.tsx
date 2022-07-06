import { ReactNode } from 'react';

import { GatewayIcon } from '@gateway/assets';
import { TOKENS } from '@gateway/theme';

import { Stack } from '@mui/material';

import { Hero } from './hero';

type Props = {
  title: string;
  subtitle: string;
  titleDescription: string;
  enterButton: ReactNode;
  connectButton: ReactNode;
};

export function LandingTemplate({ connectButton, ...heroProps }: Props) {
  return (
    <>
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
      <Hero {...heroProps} />
    </>
  );
}
