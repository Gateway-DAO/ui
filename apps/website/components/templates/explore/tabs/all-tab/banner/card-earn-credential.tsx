import {
  CardContent,
  Typography,
  Box,
  Button,
  Stack,
  CardActions,
} from '@mui/material';
import MUICard from '@mui/material/Card';
import { ROUTES } from 'apps/website/constants/routes';
import { useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';

export function CardEarnCredential(): JSX.Element {
  const { t } = useTranslation('explore');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
  return (
    <MUICard
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius: 3,
        width: '100%',
        padding: 0.5,
      }}
    >
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'column',
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
        <CardActions>
          <Button
            variant="outlined"
            href={ROUTES.EXPLORE_EARN}
            sx={{ marginBottom: 2.5, ml: 1 }}
          >
            {t('explore:earn-credentials-banner.cta')}
          </Button>
        </CardActions>
      </Stack>

      <Box
        display={'flex'}
        alignItems={'center'}
        height={'100%'}
        position={'relative'}
        top={isMobile ? 6 : 0}
        right={isMobile ? '-60px' : 0}
      >
        <Image
          src={'/images/earn-credentials.png'}
          alt="Credit score image"
          layout="fixed"
          width={isMobile ? '193px' : '224.71px'}
          height={isMobile ? '168.53px' : '196.21px'}
        />
      </Box>
    </MUICard>
  );
}
