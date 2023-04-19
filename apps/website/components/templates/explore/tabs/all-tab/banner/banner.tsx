import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

import { brandColors, theme } from '@gateway/theme';

import { alpha, Box, Button, Stack, Typography } from '@mui/material';

import CredProtocolIcon from './cred-protocol';

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
          <Box mb={2}>
            <CredProtocolIcon />
          </Box>
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
            <Link href="/creditscore" passHref>
              <Button variant="contained" sx={{ mt: 4 }}>
                {t('common:featured-banner.action')}
              </Button>
            </Link>
          </Box>
        </Box>
        <Box
          component="img"
          sx={{
            mr: 12,
            my: 2,
            maxWidth: '100%',
            height: '80%',
            [theme.breakpoints.down('md')]: {
              display: 'none',
            },
          }}
          src="/images/explore/explore-banner_figure_cred.png"
          alt={t('common:featured-banner.subtitle')}
        />
      </Box>
    </Stack>
  );
}
