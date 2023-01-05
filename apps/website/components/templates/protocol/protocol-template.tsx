import { useRouter } from 'next/router';

import { TOKENS } from '@gateway/theme';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Avatar, Box, IconButton, Stack } from '@mui/material';

import { ClientNav } from '../../../components/organisms/navbar/client-nav';

type Props = {
  children: React.ReactNode;
};

export default function ProtocolTemplate({ children }: Props) {
  const router = useRouter();

  return (
    <>
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
      <Stack sx={{ py: 2 }}>{children}</Stack>
    </>
  );
}
