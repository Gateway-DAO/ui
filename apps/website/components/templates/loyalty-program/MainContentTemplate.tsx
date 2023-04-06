import useTranslation from 'next-translate/useTranslation';
import { ReactNode } from 'react';

import { TOKENS } from '@gateway/theme';

import { Grid, Stack, useMediaQuery, useTheme } from '@mui/material';

import { ClientNav } from '../../organisms/navbar/client-nav';

type Props = {
  children: ReactNode;
};

export default function MainContentTemplate({ children }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation('settings');

  return (
    <>
      {!isMobile && (
        <Grid item xs={12} md sx={{ pt: 2 }}>
          <Stack
            direction="row"
            justifyContent="flex-end"
            sx={{
              px: TOKENS.CONTAINER_PX,
              flexGrow: {
                md: 0.5,
              },
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}
          >
            <ClientNav />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              margin: { xs: '16px 16px 40px 16px', md: '40px 60px 60px' },
            }}
          >
            {children}
          </Stack>
        </Grid>
      )}
    </>
  );
}
