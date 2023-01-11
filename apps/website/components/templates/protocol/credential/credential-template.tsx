import { useRouter } from 'next/router';

import { theme, TOKENS } from '@gateway/theme';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Avatar, Box, IconButton, Stack, useMediaQuery } from '@mui/material';

import { useCreateQrCode } from '../../../../utils/qr-code/qr-code';
import { ClientNav } from '../../../organisms/navbar/client-nav';
import { CredentialTemplateContext } from './context';

type Props = {
  children: React.ReactNode;
};

export default function CredentialTemplate({ children }: Props) {
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
  const qrCode = useCreateQrCode();

  return (
    <CredentialTemplateContext.Provider value={{ qrCode }}>
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
          px: isMobile ? TOKENS.CONTAINER_PX : 0,
        }}
      >
        {children}
      </Stack>
    </CredentialTemplateContext.Provider>
  );
}