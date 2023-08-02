import useTranslation from 'next-translate/useTranslation';

import { ROUTES } from '@/constants/routes';

import { useMediaQuery, useTheme } from '@mui/material';
import { Box, Button, Stack, Typography } from '@mui/material';

export default function Banner(): JSX.Element {
  const { t } = useTranslation('explore');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
  return (
    <Box>
      <Stack position={'absolute'} mt={5} ml={5} direction="row">
        <Box
          width={{ xs: 15, md: 25 }}
          component="img"
          src="/images/campaigns/altitude/altitude_logo.png"
          alt="altitude logo"
        ></Box>
        <Typography variant="body1" ml={1}>
          Altitude DeFi
        </Typography>
      </Stack>

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
            zIndex={2}
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
                href={ROUTES.ALTITUDE}
                id="explore-banner-primary"
              >
                {t('common:featured-banner.action')}
              </Button>
            </div>
          </Stack>
        </Stack>
        <Box
          component="img"
          alignSelf={'self-start'}
          height={{ xs: 120, md: 350 }}
          mt={{ xs: 4, md: 5 }}
          mb={{ xs: 9, md: 10 }}
          borderRadius={5}
          src="/images/campaigns/altitude/altitude_marketing_image.png"
          alt={t('common:featured-banner.subtitle')}
        />
      </Stack>
    </Box>
  );
}
