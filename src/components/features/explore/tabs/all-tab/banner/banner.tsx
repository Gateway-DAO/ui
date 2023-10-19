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
          width={{ xs: 160, md: 220 }}
          component="img"
          src="/images/campaigns/lifi/odyssey_lifi.png"
          alt="odyssey x lifi logo"
        ></Box>
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
            <Typography variant="h4">
              {t('common:featured-banner.title')}
            </Typography>
            <Typography variant="h4" color="#D083FF">
              {t('common:featured-banner.subtitle')}
            </Typography>
            <div>
              <Button
                variant="contained"
                sx={{ mt: 4 }}
                href={ROUTES.LOYALTY_PROGRAM.replace(
                  '[id]',
                  process.env.NEXT_PUBLIC_LIFI_LOYALTY_PASS
                )}
                id="explore-banner-primary"
              >
                {t('common:featured-banner.action')}
              </Button>
            </div>
          </Stack>
        </Stack>
        <Box
          component="img"
          alignSelf={'self-end'}
          justifySelf={'center'}
          height={{ xs: 150, md: 300 }}
          mt={{ xs: 4, md: 8 }}
          mb={{ xs: 9, md: 12 }}
          src="/images/campaigns/lifi/pass.png"
          alt={t('common:featured-banner.subtitle')}
        />
      </Stack>
    </Box>
  );
}
