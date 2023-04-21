import useTranslation from 'next-translate/useTranslation';

import { brandColors, theme } from '@gateway/theme';

import { alpha, Box, Button, Stack, Typography } from '@mui/material';
import { ResponsiveImage } from 'apps/website/components/templates/landing/styles';
import { ROUTES } from 'apps/website/constants/routes';

export default function Banner(): JSX.Element {
  const { t } = useTranslation('explore');

  return (
    <Stack sx={{ paddingTop: 4, px: 5 }}>
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
        <Stack
          flexDirection="row"
          justifyContent={''}
          sx={{
            [theme.breakpoints.down('md')]: {
              flexDirection: 'column',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: '',
              alignItems: '',
              rowGap: '150px',
              height: '100%',
              py: 3,
              px: 3,
            }}
          >
            <Typography>Issue Credentials</Typography>
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
                href={ROUTES.PROTOCOL_DATAMODEL.replace(
                  '[id]',
                  '1f1bff45-6ffb-48c1-ab6e-06f19cb7a744'
                )}
              >
                {t('common:featured-banner.action')}
              </Button>
            </Box>
          </Box>
          <Box
            component="img"
            sx={{
              // pr: 10,
              ml: 45,
              mr: 10,
              maxHeigh: '541.02px',
              [theme.breakpoints.down('md')]: {
                maxWidth: '459.22px',
                ml: 0,
              },
              // overflow: 'visible',
            }}
            src="/images/issue-credential-model.png"
            alt={t('common:featured-banner.subtitle')}
          />
        </Stack>
      </Box>
    </Stack>
  );
}
