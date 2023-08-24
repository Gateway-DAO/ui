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
      <Stack
        position={'absolute'}
        mt={5}
        ml={5}
        direction="row"
        alignContent={'center'}
        justifyContent={'center'}
      >
        <Box
          component="img"
          src="/images/campaigns/cred/odyseey.png"
          alt="altitude logo"
        />
        <Typography variant="body1" alignSelf={'flex-end'} fontSize={18} mx={2}>
          X
        </Typography>

        <Box
          component="img"
          src="/images/campaigns/cred/cred.png"
          alt="altitude logo"
        />
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
          marginBottom={{ xs: 10, md: 5 }}
        >
          <Stack
            maxWidth={{ xs: '100%', md: 402 }}
            marginTop={{ xs: -5, md: 0 }}
            zIndex={2}
          >
            <Typography variant="h4" gutterBottom>
              Earn Your{' '}
              <Typography variant="h4" display={'inline'} color={'#D083FF'}>
                Credit Score{' '}
              </Typography>
              Credential now!
            </Typography>
            <Typography variant="body1" color={'text.secondary'} gutterBottom>
              {t('common:featured-banner.subtitle')}
            </Typography>
            <div>
              <Button
                variant="contained"
                sx={{ mt: 4 }}
                href={ROUTES.CREDIT_SCORE}
                id="explore-banner-primary"
              >
                {t('common:featured-banner.action')}
              </Button>
            </div>
          </Stack>
        </Stack>
        <Box
          component="img"
          alignSelf={'normal'}
          height={{ xs: 120, md: 350 }}
          mt={{ xs: 4, md: 5 }}
          mb={{ xs: 9, md: 3 }}
          marginRight={'8%'}
          borderRadius={2}
          src="/images/campaigns/cred/credit-score.png"
          alt={t('common:featured-banner.subtitle')}
        />
      </Stack>
    </Box>
  );
}
