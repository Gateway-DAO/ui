import useTranslation from 'next-translate/useTranslation';
import { useMediaQuery, useTheme } from '@mui/material';

import { Box, Button, Stack, Typography } from '@mui/material';
import { ROUTES } from 'apps/website/constants/routes';

export default function Banner(): JSX.Element {
  const { t } = useTranslation('explore');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
  return (
    <Box>
      <Typography
        variant="body1"
        color={'text.secondary'}
        position={'absolute'}
        mt={5}
        ml={5}
      >
        Issue Credentials
      </Typography>
      <Stack
        component={'image'}
        direction={isMobile ? 'column-reverse' : 'row'}
        justifyContent={'space-between'}
        sx={{
          backgroundImage:
            "url('/images/explore/explore-banner_background.png')",
          backgroundSize: 'cover',
          px: isMobile ? 2 : 5,
        }}
      >
        <Stack
          alignSelf={{ md: 'self-end' }}
          direction={'column'}
          height={'100%'}
          marginBottom={{ xs: 10, md: 14 }}
        >
          <Stack
            maxWidth={{ xs: '100%', md: 402 }}
            marginTop={{ xs: -4, md: 0 }}
          >
            <Typography variant="h4" gutterBottom>
              {t('common:featured-banner.title')}
            </Typography>
            <Typography variant="body1" color={'text.secondary'} gutterBottom>
              {t('common:featured-banner.subtitle')}
            </Typography>
            <div>
              <Button
                variant="contained"
                sx={{ mt: 4 }}
                href={ROUTES.EXPLORE_ISSUE}
              >
                {t('common:featured-banner.action')}
              </Button>
            </div>
          </Stack>
        </Stack>
        <Box
          component="img"
          alignSelf={'self-start'}
          height={{ xs: 466, md: '100%' }}
          marginTop={{ xs: 9, md: 0 }}
          src="/images/issue-credential-model.png"
          alt={t('common:featured-banner.subtitle')}
        />
      </Stack>
    </Box>
  );
}
