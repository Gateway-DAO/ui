import useTranslation from 'next-translate/useTranslation';

import { TOKENS } from '@gateway/theme';
import { Navbar } from '@gateway/ui';

import { Box, Button, Divider, Stack, Typography } from '@mui/material';

import { mockDaos } from '../__mock__/daos';
import { DashboardTemplate } from '../components/templates/dashboard';

/* TODO: Pass text to i18n */

export function Index() {
  const { t } = useTranslation('dashboard-home');
  return (
    <DashboardTemplate
      followingDaos={mockDaos}
      containerProps={{ sx: { pt: 2 } }}
    >
      <Navbar />
      <Typography
        variant="h4"
        whiteSpace="pre-line"
        px={TOKENS.CONTAINER_PX}
        pt={6}
      >
        {t('title', { name: 'Lucas Inacio' })}
      </Typography>
      <Stack
        direction="column"
        divider={<Divider />}
        sx={{
          section: {
            py: 4,
          },
        }}
      >
        <Box component="section">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            px={TOKENS.CONTAINER_PX}
          >
            <Box>
              <Typography variant="h6">{t('featured-gates.title')}</Typography>
              <Typography variant="caption">
                {t('featured-gates.caption')}
              </Typography>
            </Box>
            <Button>{t('featured-gates.see-more')}</Button>
          </Stack>
        </Box>
        <Box component="section">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            px={TOKENS.CONTAINER_PX}
          >
            <Box>
              <Typography variant="h6">{t('featured-daos.title')}</Typography>
              <Typography variant="caption">
                {t('featured-daos.caption')}
              </Typography>
            </Box>
            <Button>{t('featured-daos.see-more')}</Button>
          </Stack>
        </Box>
        <Box component="section">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            px={TOKENS.CONTAINER_PX}
          >
            <Box>
              <Typography variant="h6">{t('featured-people.title')}</Typography>
              <Typography variant="caption">
                {t('featured-people.caption')}
              </Typography>
            </Box>
            <Button>{t('featured-people.see-more')}</Button>
          </Stack>
        </Box>
      </Stack>
    </DashboardTemplate>
  );
}

export default Index;
