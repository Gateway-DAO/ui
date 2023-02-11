import useTranslation from 'next-translate/useTranslation';

import { brandColors, theme } from '@gateway/theme';

import { alpha, Box, Button, Stack, Typography } from '@mui/material';

export default function Banner(): JSX.Element {
  const { t } = useTranslation('explore');

  return (
    <Stack sx={{ py: 4, px: 5 }}>
      <Box
        sx={{
          borderRadius: '15px',
          backgroundImage:
            "url('/images/explore/explore-banner_background.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'left top',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            py: 3,
            px: 3,
          }}
        >
          <img
            width="58px"
            src="/images/explore/explore-banner_icon.png"
            alt={t('common:featured-banner.title')}
          />
          <Box sx={{ maxWidth: '460px' }}>
            <Typography
              sx={{
                fontSize: '34px',
                fontWeight: 700,
                lineHeight: '123.5%',
                letterSpacing: '0.25px',
                mb: 2,
              }}
            >
              {t('common:featured-banner.title')}
            </Typography>
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '150%',
                letterSpacing: '0.15px',
                color: alpha(brandColors.white.main, 0.7),
              }}
            >
              {t('common:featured-banner.subtitle')}
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 4 }}
              href="http://mygateway.xyz"
              target="_blank"
            >
              {t('common:featured-banner.action')}
            </Button>
          </Box>
        </Box>
        <Box
          component="img"
          sx={{
            pr: 4,
            maxWidth: '100%',
            [theme.breakpoints.down('md')]: {
              display: 'none',
            },
          }}
          src="/images/explore/explore-banner_figure.png"
          alt={t('common:featured-banner.subtitle')}
        />
      </Box>
    </Stack>
  );
}
