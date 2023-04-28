import { CardContent, Typography, Box, Button, Stack } from '@mui/material';
import MUICard from '@mui/material/Card';
import { useMediaQuery, useTheme } from '@mui/material';
import { ROUTES } from 'apps/website/constants/routes';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';

export function CardCreditScore(): JSX.Element {
  const theme = useTheme();
  const { t } = useTranslation('explore');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return isMobile ? (
    <MUICard
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius: '16px',
        ml: '25px',
      }}
    >
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <CardContent sx={{}}>
          <Typography
            gutterBottom
            variant="subtitle1"
            sx={{ cursor: 'pointer' }}
            color={'white'}
          >
            {t('explore:credit-score-banner.title')}
          </Typography>
          <Typography
            gutterBottom
            sx={{ cursor: 'pointer', lineHeight: '160%' }}
            variant="subtitle1"
            color={'white'}
          >
            {t('explore:credit-score-banner.subtitle')}
          </Typography>
          <Typography
            height={40}
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {t('explore:credit-score-banner.description')}
          </Typography>
        </CardContent>
        <Button
          variant="outlined"
          sx={{ marginBottom: '20px', width: '106px', marginLeft: '10px' }}
          href={ROUTES.CREDIT_SCORE}
        >
          {t('explore:credit-score-banner.cta')}
        </Button>
      </Stack>

      <Box
        sx={{
          marginTop: '20px',
          marginRight: '-20px',
        }}
      >
        <img
          src={'/images/credit-score.png'}
          alt={'Credit score image'}
          width={'142px'}
          height={'124.22px'}
        />
      </Box>
    </MUICard>
  ) : (
    <MUICard
      sx={{
        width: '49.6%',
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius: '16px',
      }}
    >
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <CardContent sx={{ py: '10px', marginY: '20px' }}>
          <Typography gutterBottom variant="h5" sx={{ cursor: 'pointer' }}>
            {t('explore:credit-score-banner.title')}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            sx={{ cursor: 'pointer', lineHeight: '160%' }}
          >
            {t('explore:credit-score-banner.subtitle')}
          </Typography>
          <Typography
            height={40}
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
            {t('explore:credit-score-banner.description')}
          </Typography>
        </CardContent>
        <Button
          variant="outlined"
          href={ROUTES.CREDIT_SCORE}
          sx={{ marginBottom: '20px', width: '106px', marginLeft: '20px' }}
        >
          {t('explore:credit-score-banner.cta')}
        </Button>
      </Stack>

      <Box
        sx={{
          marginTop: '40px',
          marginRight: '10px',
        }}
      >
        <Image
          src={'/images/credit-score.png'}
          alt={'Credit score image'}
          width={'200px'}
          height={'180px'}
          layout="fixed"
        />
      </Box>
    </MUICard>
  );
}
