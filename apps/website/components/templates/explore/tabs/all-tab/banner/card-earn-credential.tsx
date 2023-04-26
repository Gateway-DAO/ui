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
import { ROUTES } from 'apps/website/constants/routes';
import { useMediaQuery, useTheme } from '@mui/material';

export function CardEarnCredential(): JSX.Element {
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
            sx={{ cursor: 'pointer' }}
            variant="subtitle1"
            color={'white'}
          >
            Earn credentials
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: '166%',
            }}
          >
            Execute tasks and earn credentials
          </Typography>
        </CardContent>
        <Button
          variant="outlined"
          sx={{ marginBottom: '20px', width: '106px', ml: 1 }}
        >
          START NOW
        </Button>
      </Stack>

      <Box
        sx={{
          marginTop: '20px',
          marginRight: '-30px',
        }}
      >
        <img
          src={'/images/earn-credentials.png'}
          alt={'Credit score image'}
          width={'140px'}
          height={'188px'}
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
            Earn credentials
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
            Execute tasks and earn credentials
          </Typography>
        </CardContent>
        <Button
          variant="outlined"
          sx={{ marginBottom: '20px', width: '106px', marginLeft: '20px' }}
        >
          START NOW
        </Button>
      </Stack>

      <Box
        sx={{
          marginTop: '20px',
          marginRight: '10px',
        }}
      >
        <img
          src={'/images/earn-credentials.png'}
          alt={'Credit score image'}
          width={'310px'}
        />
      </Box>
    </MUICard>
  );
}
