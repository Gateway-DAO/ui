import {
  Avatar,
  CardContent,
  CardHeader,
  Chip,
  Typography,
  Box,
  CardActions,
  Button,
  Stack,
} from '@mui/material';
import MUICard from '@mui/material/Card';
import { useMediaQuery, useTheme } from '@mui/material';
import { ROUTES } from 'apps/website/constants/routes';
import { brandColors, theme } from '@gateway/theme';

export function CardCreditScore(): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
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
            Your new DeFi Credit
          </Typography>
          <Typography
            gutterBottom
            sx={{ cursor: 'pointer', lineHeight: '160%' }}
            variant="subtitle1"
            color={'white'}
          >
            Score has arrived
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
            Discover your credit score now
          </Typography>
        </CardContent>
        <Button
          variant="outlined"
          sx={{ marginBottom: '20px', width: '106px', marginLeft: '10px' }}
        >
          ISSUE NOW
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
        width: '49%',
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
            Your new DeFi Credit
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            sx={{ cursor: 'pointer', lineHeight: '160%' }}
          >
            Score has arrived
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
            Discover your credit score now
          </Typography>
        </CardContent>
        <Button
          variant="outlined"
          sx={{ marginBottom: '20px', width: '106px', marginLeft: '20px' }}
        >
          ISSUE NOW
        </Button>
      </Stack>

      <Box
        sx={{
          marginTop: '40px',
          marginRight: '10px',
        }}
      >
        <img
          src={'/images/credit-score.png'}
          alt={'Credit score image'}
          width={'169.18px'}
        />
      </Box>
    </MUICard>
  );
}
