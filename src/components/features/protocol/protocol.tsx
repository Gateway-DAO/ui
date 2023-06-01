import { useRouter } from 'next/router';

import { ProtocolContext } from '@/components/features/protocol/context';
import { ClientNav } from '@/components/organisms/navbar/client-nav';
import { Credential } from '@/services/gateway-protocol/types';
import { theme, TOKENS } from '@/theme';
import { useCreateQrCode } from '@/utils/qr-code/qr-code';
import { PartialDeep } from 'type-fest';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Avatar, Box, IconButton, Stack, useMediaQuery } from '@mui/material';

import FloatingCta from './components/floating-cta';

type Props = {
  children: React.ReactNode;
  credential?: PartialDeep<Credential>;
};

export default function Protocol({ children, credential }: Props) {
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
  const qrCode = useCreateQrCode();

  const isCredential = router.pathname.includes('/credentials/');

  return (
    <ProtocolContext.Provider value={{ qrCode }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={1}
        sx={{
          display: 'flex',
          pt: 2,
          flexGrow: {
            md: 0.5,
          },
          px: TOKENS.CONTAINER_PX,
        }}
      >
        <IconButton onClick={() => router.back()}>
          <Avatar>
            <ArrowBackIcon />
          </Avatar>
        </IconButton>
        <Box>
          <ClientNav />
        </Box>
      </Stack>
      <Stack
        sx={{
          py: 2,
          pb: { md: 4, xs: 27 },
          px: isMobile ? TOKENS.CONTAINER_PX : 0,
        }}
      >
        {children}
      </Stack>
      <FloatingCta isCredential={isCredential} credential={credential} />
    </ProtocolContext.Provider>
  );
}
