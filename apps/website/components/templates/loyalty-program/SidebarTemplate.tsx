import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { TOKENS } from '@gateway/theme';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { ClientNav } from '../../organisms/navbar/client-nav';

type Props = {
  children: ReactNode;
};

export default function SidebarTemplate({ children }: Props) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation('settings');

  return (
    <Grid item xs={12} md={4} sx={{ pt: 2, flexGrow: 0 }}>
      <Stack
        direction="row"
        flexGrow={1}
        alignItems="center"
        justifyContent="space-between"
        gap={1}
        sx={{
          display: 'flex',
          px: TOKENS.CONTAINER_PX,
          flexGrow: {
            md: 0.5,
          },
          mb: { xs: 2, md: 4 },
        }}
      >
        <IconButton onClick={() => router.back()}>
          <Avatar>
            <ArrowBackIcon />
          </Avatar>
        </IconButton>
        <Box sx={{ display: { sm: 'flex', md: 'none' }, mr: 2 }}>
          <ClientNav />
        </Box>
      </Stack>
      {children}
    </Grid>
  );
}
