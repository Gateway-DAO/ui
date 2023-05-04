import {
  CardContent,
  Typography,
  Box,
  CardActions,
  Button,
  Stack,
  useMediaQuery,
} from '@mui/material';
import MUICard from '@mui/material/Card';
import { useTheme } from '@mui/material';
import { ROUTES } from 'apps/website/constants/routes';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';

export function CardCreditScore(): JSX.Element {
  const theme = useTheme();
  const { t } = useTranslation('explore');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <MUICard
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius: 3,
        width: '100%',
        marginRight: 2,
        p: 0.5,
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
            variant={isMobile ? 'subtitle1' : 'h5'}
            sx={{ cursor: 'pointer' }}
            color={'white'}
          >
            {t('explore:credit-score-banner.title')}
          </Typography>
          <Typography
            gutterBottom
            sx={{ cursor: 'pointer' }}
            variant={isMobile ? 'subtitle1' : 'h5'}
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
        <CardActions>
          <Button
            href={ROUTES.CREDIT_SCORE}
            variant="outlined"
            sx={{ marginBottom: 1, ml: 1 }}
          >
            {t('explore:credit-score-banner.cta')}
          </Button>
        </CardActions>
      </Stack>

      <Box
        display={'flex'}
        alignItems={'center'}
        height={'100%'}
        position={'relative'}
        top={{ xs: 16, md: 0 }}
        right={{ xs: '-20px', md: 0 }}
      >
        <Image
          src={'/images/credit-score.png'}
          alt={t('explore:credit-score-banner.img-alt')}
          width={isMobile ? '142px' : '169px'}
          height={isMobile ? '125px' : '148px'}
        />
      </Box>
    </MUICard>
  );
}
