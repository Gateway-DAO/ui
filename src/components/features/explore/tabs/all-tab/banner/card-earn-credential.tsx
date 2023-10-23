import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';

import { ROUTES } from '@/constants/routes';

import {
  CardContent,
  Typography,
  Box,
  Button,
  Stack,
  CardActionArea,
} from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';
import MUICard from '@mui/material/Card';

export function CardEarnCredential(): JSX.Element {
  const { t } = useTranslation('explore');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
  return (
    <MUICard
      sx={{
        borderRadius: 2,
        width: '100%',
      }}
    >
      <Link passHref href={ROUTES.EXPLORE_EARN}>
        <CardActionArea
          component="a"
          sx={{
            display: 'flex',
            height: '100%',
            justifyContent: 'space-between',
            p: 0.5,
          }}
        >
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              justifyContent: 'space-between',
            }}
          >
            <CardContent>
              <Typography
                gutterBottom
                sx={{ cursor: 'pointer' }}
                variant={isMobile ? 'subtitle1' : 'h5'}
                color={'white'}
              >
                {t('explore:earn-credentials-banner.title')}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  lineHeight: '166%',
                }}
              >
                {t('explore:earn-credentials-banner.description')}
              </Typography>
            </CardContent>
            <div>
              <Button
                variant="outlined"
                href={ROUTES.EXPLORE_EARN}
                sx={{ marginBottom: 1, ml: 2 }}
              >
                {t('explore:earn-credentials-banner.cta')}
              </Button>
            </div>
          </Stack>

          <Box
            display={'flex'}
            alignItems={'center'}
            height={'100%'}
            position={'relative'}
            top={{ xs: 6, md: 0 }}
            right={{ xs: '-60px', md: 0 }}
          >
            <Image
              src={'/images/earn-credentials.png'}
              alt={t('explore:earn-credentials-banner.img-alt')}
              layout="fixed"
              width={isMobile ? '193px' : '224.71px'}
              height={isMobile ? '168.53px' : '196.21px'}
            />
          </Box>
        </CardActionArea>
      </Link>
    </MUICard>
  );
}
