import { useRouter } from 'next/router';

import { TOKENS } from '@gateway/theme';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Divider,
  useMediaQuery,
  useTheme,
  Avatar,
  Box,
  Grid,
  IconButton,
  Stack,
} from '@mui/material';

import { useWindowSize } from '../../../hooks/use-window-size';
import { ClientNav } from '../../organisms/navbar/client-nav';
type Props = {
  sidebar: React.ReactNode;
  mainContent: React.ReactNode;
};

export default function LoyaltyProgramTemplate({
  sidebar,
  mainContent,
}: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const windowSize = useWindowSize();
  const router = useRouter();

  return (
    <>
      <Grid
        container
        height={isMobile ? 'auto' : '100%'}
        sx={{
          flexWrap: 'nowrap',
          flexDirection: { xs: 'column', md: 'row' },
          minHeight: `${windowSize.height}px`,
        }}
      >
        <Grid
          item
          xs={12}
          md={4}
          sx={{ pt: 2, pb: { xs: 2, md: 0 }, flexGrow: 0 }}
        >
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
          {sidebar}
        </Grid>
        <Divider orientation={isMobile ? 'horizontal' : 'vertical'} flexItem />
        <Grid item xs={12} md sx={{ pt: 4 }}>
          {mainContent}
        </Grid>
      </Grid>
    </>
  );
}
